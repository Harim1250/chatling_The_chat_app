import cloudinary from "../lib/cloudinary.js";
import userData from "../modules/chatting.js";
import Message from "../modules/message.mobal.js";

// this routes from the sidebar user details..
export const getuserforsidebar = async (req , res ) =>{
 
    try {
        const loggedInuserId = req.user._id;
        const filteredUsers = await userData.find({_id: { $ne:loggedInuserId}}).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
       console.error("Error in getuserforsidebar:", error.message);
       res.status(500).json({ message: "Internal server error" });
    }
};


// this routes is for the talk between two user one for the admion and other from second user 
export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params; // ID of the second user (not the admin)
    const myId = req.user._id; // Admin or logged-in user ID

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId }
      ]
    }).sort({ createdAt: 1 }); // Optional: sort by timestamp ascending

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessage:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


// while sending a message it could be a text message or will be the images message so keep in mind
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl = null;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "chat_images", // optional: organize in a folder
      });
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    // TODO: Emit message via socket.io (real-time feature)
    res.status(201).json(newMessage);

  } catch (error) {
    console.error("Error in sendMessage controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
