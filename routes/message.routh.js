import express from "express"
import { protectRoute } from "../middlewares/auth.middlewere.js";
import { getMessage, getuserforsidebar, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();
// 1. this routes from the sidebar user details..
router.get("/user", protectRoute , getuserforsidebar)

// 2. this routes is for the talk between two user 
// the :id is normal veriable not a id form the database;
router.get("/:id", protectRoute , getMessage );

// 3. this routes is used to send out the message 
router.post("/send/:id" , protectRoute , sendMessage);


export default router;