const mongoose =  require('mongoose');
const validator =  require("validator");

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minLength : 4 ,
        maxLength : 15
    },
    lastName : {
        type : String
    },
    emailId : {
        type : String,
        lowercase : true,
        trim : true,
        required : true,
        unique : true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error("Invalid Email address!")
            }
        }
    },
    password :  {
        type : String,
        validate(value){
            if (!validator.isStrongPassword(value)){
                throw new Error("password not strong!")
            }
        }
    },
    age :  {
        type : Number,
        min : 18,
        max : 50
    },
    gender : {
        type : String,
        validate(value){
            if (!["male","female","others"].includes(value)){
                throw new Error("Enter a valid Gender !")
            }
        }
    },
    photoUrl : {
        type : String,
        default : "dummy_photo_url.jpg"
    },
    about : {
        type : String,
        default : "This is a Default description about user"
    },
    skills : {
        type : [String],
    },
},{
    timestamps:true,
}
)

const User = mongoose.model("User",userSchema);

module.exports = User;