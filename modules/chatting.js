import mongoose from "mongoose";

const {Schema} = mongoose;

const user = new Schema(
{
    fulname:{
        type:String,
        require:true
    },

    email:{ 
        type:String,
        require:true,
        unique:true,
    },

    password:{
        type:String,
        require:true,
        minlength: 6,
    },

    profilepic:{
        type:String,
        default:""
    },
},
    {timestamps:true}
)

const userData = mongoose.model('Items', user)
export default userData