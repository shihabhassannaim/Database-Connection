const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost:27017/DataConnection");

// Define the User schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  dp: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
});

userSchema.plugin(plm);
// Create the User model
const UserModel = mongoose.model("User", userSchema);

// Export the model for use in other parts of your application
module.exports = UserModel;
