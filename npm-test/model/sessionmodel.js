const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    session: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
  },
  { collection: "session" }
);

const Session = mongoose.model("Session", UserSchema);

module.exports = Session;
