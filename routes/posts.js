const mongoose = require("mongoose");

// Define the schema for the post
const postSchema = new mongoose.Schema({
  imagetext: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  currentDate: {
    type: Date,
    default: Date.now,
  },
  currentTime: {
    type: String,
    default: getTimeString,
  },
  likes: {
    type: Array,
    default: [],
  },
});

// Helper function to get the current time in HH:MM format
function getTimeString() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

// Create the Mongoose model for the post
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
