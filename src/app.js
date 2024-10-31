
const express = require('express');
const connectDB = require("./config/database")
const app = express();
const User = require("./models/User")
app.use(express.json());  


connectDB().then(()=>{
    console.log("data base connected !");
    app.listen(8000, () => {
        console.log("server is running");
        
    });
    
}).catch((err)=>{
    console.log("db not connected");
    
});

app.post("/signup", async (req,res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.send("User added success")
    } catch (err) {
        res.status(400).send("Database connection failed")
    }    
})

app.get('/user',async (req,res)=>{
    const userEmail=req.body.emailId
    try {
        const user = await  User.find({emailId : userEmail});
        res.send(user)
    }
    catch{
        res.status(400).send("Something went wrong");
    }
   
})


app.get("/feed",async(req,res)=>{
    try {
        const user = await  User.find();
        res.send(user)
    }
    catch{
        res.status(400).send("Something went wrong");
    }
})


app.delete("/delete",async(req,res)=>{
    const userId = req.body.userId;
    try {
        const user = await  User.findByIdAndDelete(userId);
        res.send("user deleted")
    }
    catch (err){
        res.status(400).send("Something went wrong");
    }
})

app.patch("/update",async(req,res)=>{

    const userId = req.params?.userId;
    const data = req.body;

    try {
        const allowedUpdates = [ "photoUrl","about","gender","age","skills"]

        const isUpdateAllowed = object.keys(data).every((k) => allowedUpdates.includes(k));
        if (!isUpdateAllowed){
            throw new Error("update cannot be done!")
        }
        if (data.skills.length >10 ){
            throw new Error ("skills cannot be more than 10 !")
        }
        const user = await  User.findByIdAndUpdate({_id : userId},data,{
            runValidators : true
        });
        res.send("user updated")
    }
    catch (err){
        res.status(400).send("Something went wrong");
    }
})




