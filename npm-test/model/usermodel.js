const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Ad alanı boş olamaz"],
      trim: true,
      minlength: 2,
      maxlength: 30,
    },
    surname: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: [30, "soyadı maksimum 30 karakter olmalı"],
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    avatar: {
      type: String,
      default: "error.gif",
    },
    durum: {
      type: String,
      trim: true,
    },hakkinda: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    
  },
  { collection: "user" }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
