const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResimSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Kullanıcı alanı boş olamaz"],
    },
    resim_turu: {
      type: String,
      required: [true, "Resim turu alanı boş olamaz"],
    },
    resim: {
      type: String,
      required: true,
    },
    etiket: {
      type: Array,
    },
    explanation: {
      type: String,
    },
    likes: {
      type: Array,
      default:[] 
    },
    likeSayisi:{
      type : Number,
      default : 0
    }
  },
  { collection: "Resim" }
);

const Resim = mongoose.model("Resim", ResimSchema);

module.exports = Resim;
