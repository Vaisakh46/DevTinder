const mongoose =  require('mongoose')

const connectionRequestSchema = new mongoose.Schema({

    formUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true
    },
    toUserId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true
    },
    status : {
        type : String ,
        required : true,
        enum : {
            values : ["ignore","interested","accepted","rejected"],
            message : "{VALUE} is incorrect status"
        }
       
    }


},{
    timestamps: true,
});

connectionRequestSchema.index({
    formUserId : 1 , toUserId : 1
})

connectionRequestSchema.pre("save",function(){
    const connectionRequest = this;

    if (connectionRequest.formUserId.equals(connectionRequest.toUserId)){
        throw new Error("Connection request failed")
    }
    next();
})

const ConnectionRequestModel = new mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports = ConnectionRequestModel;