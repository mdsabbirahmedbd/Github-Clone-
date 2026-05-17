const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    uid: {
      type: String,
      unique: true,
      sparse: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      default: null, 
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    repositories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Repository",
        default: [],
      },
    ],
    followedUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
     following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    starred: [
      {
        type: Schema.Types.ObjectId,
        ref: "Repository",
        default: [],
      },
    ],
  },
  { timestamps: true },
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
