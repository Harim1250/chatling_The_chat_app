import mongoose from "mongoose";

const {Schema} = mongoose;

const messageSchema = new Schema(
{
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userData",
        require:true
    },

    receiverId:{ 
        type:mongoose.Schema.Types.ObjectId,
        ref:"userData",
        require:true
    },

    text:{
        type:String,
    },

    image:{
        type:String,
    },
},
    {timestamps:true}
)

const Message = mongoose.model('Items2', messageSchema)
// har gha par isko he export karna hii..
export default Message;