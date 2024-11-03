
const express = require('express');
const connectDB = require("./config/database")
const app = express();
const User = require("./models/User")
const {validateSignupData} = require("./utils/validation")
const bcrypt = require("bcrypt")

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

   
    try {
        validateSignupData(req)
        const { firstName , lastName , emailId, password} = req.body


        const passwordHash = await bcrypt.hash(password,10);

    
        const user = new User({
            firstName,
            lastName,
            emailId,
            password:passwordHash
        });
        await user.save();
        res.send("User added success")
    } catch (err) {
        res.status(400).send("ERROR "+ err.message)
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


app.post('/login', async (req,res) => {

   
    try {

        const {emailId,password} = req.body;

        if (!validator.isEmail(emailId)){
            throw new Error("Email Id is not valid")
        }
        const user = await User.findOne({emailId:emailId});
        if (!user) {
            throw new Error ("Invalid Credentials")
        }

        const isPasswordValid = await bcrypt.compare(password,user.password)

        if (isPasswordValid){
            res.send("Login Successfull")
        }
        else {
            throw new Error ("Invalid Credentials")
        }

    }
    
    catch (err) {
        res.status(400).send("ERROR "+ err.message)
    }  

})



