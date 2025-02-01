import mongoose from "mongoose";
import validator from "validator";
const User_Schema = new mongoose.Schema(
  {
    Username: {
      type: String,
      unique: true,
      required: true,
      default: "WeChat_user",
    },
    Fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid email");
        }
      },
    },

    password: {
      type: "string",
      required: true,
      minlength: 6,
    },
    profile_pic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", User_Schema);

export default User;
