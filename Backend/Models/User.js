import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import FriendRequest from "./friendRequest.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    default: 'xxxx',
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  sentFriendRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: FriendRequest,
    },
  ],
  receivedFriendRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: FriendRequest,
    },
  ],
  bio: {
    type: String,
    default: "",
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RegisteredUser",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RegisteredUser",
    },
  ],
});

userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign(
      { _id: this._id.toString(), email: this.email },
      process.env.SECRET_KEY
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

const Register = mongoose.model("RegisteredUser", userSchema);

export default Register;
