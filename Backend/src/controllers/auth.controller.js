import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generate_token } from "../lib/util.js";
import cloudinary from "../lib/cloudinary.js";
import { toast } from "react-hot-toast";

export const signup = async (req, res) => {
  try {
    const { Fullname, email, password, Username } = req.body;
    if (!Fullname || !email || !password || !Username) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: " This mail already exists" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 charcters " });
    }
    const username = await User.findOne({ Username });
    if (username) {
      return res.status(400).json({ message: "This username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const newuser_model = new User({
      Username: Username,
      Fullname: Fullname,
      email: email,
      password: hashedpassword,
    });

    //  console.log(newuser_model);

    if (newuser_model) {
      await newuser_model.save();
      generate_token(newuser_model._id, res);
      // Call after saving the user
    }

    return res.status(201).json({
      message: "user created successfully",
      user_id: newuser_model._id,
      Fullname: newuser_model.Fullname,
      email: newuser_model.email,
      Username: newuser_model.Username,
      createdAt: newuser_model.createdAt,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "invalid user data provided" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 charcters " });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Invalid login-check your credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(404)
        .json({ message: "Invalid login-check your credentials" });
    }

    generate_token(user._id, res);
    return res.status(200).json({
      message: "user logged in",
      user_id: user._id,
      Fullname: user.Fullname,
      email: user.email,
      Username: user.Username,
      profile_pic: user.profile_pic,
      createdAt: user.createdAt,
    });
  } catch (error) {
    return res.status(404).json({ message: "invalid user data " });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt", { maxAge: 0, httpOnly: true, secure: true });
    return res.status(200).json({ message: "user logged out" });
  } catch (error) {
    // console.log("error in logging out:", error.message);
    return res
      .status(404)
      .json({ message: " server error cannot log out Try again" });
  }
};

export const updateProfile = async (req, res) => {
  let uploaded_profilepic = "";
  try {
    const { profile_pic } = req.body;
    const user_id = req.user?._id;
    if (!profile_pic) {
      //console.log("profile pic is not given");
      return res.status(400).json({ message: "profile pic is required" });
    }

    try {
      const uploaded = await cloudinary.uploader.upload(profile_pic, {
        folder: "profile_pics we chat",
      });
      uploaded_profilepic = uploaded;
      console.log(uploaded_profilepic);
    } catch (uploadError) {
      //console.error("Cloudinary upload error:", uploadError.message);
      return res
        .status(500)
        .json({ message: "Failed to upload profile picture" });
    }

    const updated_user = await User.findByIdAndUpdate(
      user_id,
      {
        profile_pic: uploaded_profilepic.secure_url,
      },
      { new: true }
    );
    return res.status(200).json(updated_user);
  } catch (error) {
    //console.log(" there is an error in updating profile:", error.message);
    res.status(500).json({ message: "cant update the profile " });
  }
};

export const check_Auth = async (req, res) => {
  try {
    if (!req.user) {
      // If `req.user` is not present, send a 401 Unauthorized response and stop execution
      return res
        .status(401)
        .json({ message: "Unauthorized: User not authenticated" });
    }
    return res.status(201).json(req.user);
  } catch (error) {
    console.log("error in checking auth controller  ", error.message);
    return res.status(400).json({ message: "error in checking authorisation" });
  }
};
