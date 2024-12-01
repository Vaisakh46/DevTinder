const express = require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequestModel = require('../models/connectionRequest');

const userRouter = express.Router();


userRouter.get("/user/requests/received",userAuth,async (res,req) => {
    try{
        const loggedInUser = req.user ;
        
        const connectionRequest = await ConnectionRequestModel.find({
            toUserId: loggedInUser._id,
            status:"interested"
        }).populate("fromUserId",["firstName","LastName"]); 

        res.json({
            message:"Data Fetched Successfully",
            data : connectionRequest,
        })

    }
    catch (err){
        res.status(400).send("Error"+err.message);
    }
})

userRouter.get("/user/connections",userAuth,async (req,res) =>{
    try{
        const loggedInUser =  req.user;

        const connectionRequests = await ConnectionRequestModel.find({
            $or : [
                {toUserId : loggedInUser._id , status: "accepted"},
                {fromUserId : loggedInUser._id , status : "accepted"}
            ]
        }).populate("fromUserId",["firstName","lastName"])
        .populate("toUserId",["firstName","lastName"])  

        const data = connectionRequests.map((row) => {
            
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
            });
               

        res.json({data})

    }
    catch(err){
        res.status(400).send(Error)
    }
})
module.exports = userRouter;



