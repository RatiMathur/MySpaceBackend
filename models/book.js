const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
});

module.exports = model("Book", bookSchema);
