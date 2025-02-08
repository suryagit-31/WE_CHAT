import cloudinary from "../lib/cloudinary.js";
import { get_reciver_socketId } from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { io } from "../lib/socket.js";

export const getusers_Sidebar = async (req, res) => {
  try {
    const logged_userID = req.user._id;
    const filteredusers = await User.find({
      _id: { $ne: logged_userID },
    }).select("-password");

    return res.status(200).json(filteredusers);
  } catch (error) {
    console.log("error is fetching users", error.message);
    return res.status(404).json({ message: "internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: usertochatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, recieverId: usertochatId },
        { senderId: usertochatId, recieverId: myId },
      ],
    });

    return res.status(200).json(messages);
  } catch (error) {
    console.log("error is fetching messages", error.message);
    return res.status(404).json({ message: "internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;

    if (image) {
      const uploaded_image = await cloudinary.uploader.upload(image);
      imageUrl = uploaded_image.secure_url;
    }

    const newMessage = await Message({
      senderId: senderId,
      recieverId: receiverId,
      text: text,
      image: imageUrl,
    });

    await newMessage.save();

    //real time fetching  using socket io

    const reveiverSocketId = get_reciver_socketId(receiverId);

    if (reveiverSocketId) {
      io.to(reveiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(200).json(newMessage);
  } catch (error) {
    console.log("error is sending message", error.message);
    return res.status(404).json({ message: "internal server error" });
  }
};
