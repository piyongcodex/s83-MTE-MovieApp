const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "I.D. is required"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  director: {
    type: String,
    required: [true, "Director is required"],
  },
  year: {
    type: Number,
    required: [true, "Year is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  genre: {
    type: String,
    required: [true, "Genre is required"],
  },
  imageUrl: {
    type: String,
    required: [true, "Image URL is required"],
  },
  comments: {
    type: [
      {
        userId: {
          type: String,
          required: [true, "UserId is required"],
        },
        comment: {
          type: String,
          required: [true, "Comment is required"],
        },
      },
    ],
    default: [],
  },
});

module.exports = mongoose.model("Movies", movieSchema);
