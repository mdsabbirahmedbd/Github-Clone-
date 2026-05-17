const mongoose = require("mongoose");
const { Schema } = mongoose;

const SocialSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  ownerUID: {
    type: String,
    required: true,
  },
  description: { type: String },
  link: { type: String, default: null },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
},{timestamps : true});

const Social = mongoose.model("Social", SocialSchema);
module.exports = Social;
