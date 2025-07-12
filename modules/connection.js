import mongoose from "mongoose";

async function connectdata(userData){
    try {
    await mongoose.connect(userData)
    console.log("mongodb is connected succesfully");

   } catch (error) {
      console.error("error in connecting in database", error);
      throw error;
   }
}
export default connectdata;