
const mongoose = require("mongoose");


const productSchema = {
  title: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  like: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "users"
  },
  dislike: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "users"
  },
  likesCount: {
    type: Number,
    default: 0
  },

}
module.exports = mongoose.model("recipes", productSchema);