import cloudinary from "../lib/cloudinary.js";
import { tokenmiddle } from "../lib/utils.js";
import userData from "../modules/chatting.js";
import bcrypt from 'bcryptjs'


// THE SIGNUP PART
export const Signup =  async (req,res)=>{
 const {fulname, password, email} = req.body;
 try {
    if(password.length < 6){
       return res.status(400).json({message: "the password must be altest of 6 char"});
    }

 // checking out the email that may already exists
    const user = await userData.findOne({email});
    if(user) return res.status(400).json({message: "the email already exists"})


    // Hashing the password throught the bycript
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password , salt);

    // creating the newuser
    const newUser = new userData({
        fulname,
        email,
        password:hashedpassword
    });

    if(newUser){
      // generating the jwt token
      tokenmiddle(newUser._id,res)
      await newUser.save();

      // SUCCESSFULL MESSAGE
      res.status(201).json({
         _id: newUser._id,
         fulName:newUser.fulname,
         email:newUser.email,
         profilepic: newUser.profilepic,
      });
    }
    else
    {
      res.status(400).json({message: "Invalid user ID"})
    }

   } 
     catch (error) 
     {
       console.log("error in the signup controller", error.message);
       res.status(500).json({message: "internal server Error"});
     }
};


// THE LOGIN PART
export const login = async (req,res)=>{
  const {email, password} = req.body;

  try {
   // find out the email and sent it to in the user veriable 
   const user = await userData.findOne({email})

   if(!user){
      return res.status(400).json({message:"Invalid User"})
   }

// creating the veriable to check out the password is correct or not 
    const isCorrectpassword = await bcrypt.compare(password , user.password)

    if(!isCorrectpassword){
      return res.status(400).json({message:"Invalid User"})
    }
// GENERATING THE TOKEN IF THE ID MATCH WITH THE DATA..
    tokenmiddle(user._id,res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fulname,
      email: user.email,
      profilepic: user.profilepic,
    })

  } catch (error) 
     {
       console.log("error in the signup controller", error.message);
       res.status(500).json({message: "internal server Error"});
     }
};


// THE LOGOUT PART 
export const logout = (req,res)=>{
//  THE MAIN CONCEPT IN LOGOUT IS THAT JUST REMOVE OUT THE COOKIES 

 try {
   res.cookie("jwt", "" , {maxAge:0});
   res.status(200).json({message:"Logout successfully"});
 } 

 catch (error) 
     {
       console.log("error in the signup controller", error.message);
       res.status(500).json({message:"internal server Error"});
     }
};

// updated profile part
export const updateprofile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    // Update user document with new profile pic URL
    const updatedUser = await userData.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in uploading the image:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


// checking user profile auth user.

export const checkAuth = (req, res) =>{
   try {
      res.status(200).json(req.user);
   } catch (error) {
    console.log("error in the checkAuth controller", error.message);
    res.status(500).json({message: "internal server Error"});
   }
};
