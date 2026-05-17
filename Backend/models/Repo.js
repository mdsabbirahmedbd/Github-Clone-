const mongoose = require("mongoose");
const { Schema } = mongoose;

const RepoSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: { type: String },
  vesivelity: { type: Boolean , default : false},
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
});

const Repository = mongoose.model("Repository", RepoSchema);
module.exports = Repository