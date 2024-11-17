const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth");

const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user")

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  
  try {

    const fromUserId = express.request.user._id;

    const toUserId = req.params.toUserId;

    const status = req.params.status;
    const allowedStatus = ["ignored","interested"];

    const toUser = await User.findById(toUserId);
    
    if (!toUser) {
      return res.status(400).send("User is not found");
    }

    if (!allowedStatus.includes(status)){
      return res.status(400).json(
        {message : "Invalid status type"}
      )
    }

    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or : [ {fromUserId,toUserId},
        {fromUserId:toUserId , toUserId:fromUserId },
      ],
      
    })

    if (existingConnectionRequest){
      return res.status(400).send({
        message : "Connection request Already exists"
      })
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();
    if (status == "ignored"){
      res.json({
        message : req.user.firstName+" has "+status+" "+toUser.firstName,
      })
    }
    else{
      res.json({
        message : req.user.firstName+" is "+status+" in "+toUser.firstName,
      })
    }

    

  } catch (err) {
    res.status(400).send("Error")
  }
  

  res.send(user.firstName + "sent the connect request!");
});

module.exports = requestRouter;