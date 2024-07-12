const Movie = require("../models/Movie");

module.exports.addMovie = (req, res) => {
  let newMovie = new Movie({
    userId: req.user.id,
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    description: req.body.description,
    genre: req.body.genre,
    comments: req.body.comments,
  });

  newMovie
    .save()
    .then((savedMovie) => res.status(201).send(savedMovie))
    .catch((saveErr) => {
      console.error("Error in saving the movie: ", saveErr);
      return res.status(500).send({ error: "Failed to save the movie" });
    });
};
module.exports.getAllMovies = (req, res) => {
  Movie.find()
    .then((movies) => {
      if (movies.length > 0) {
        return res.status(200).send({ movies });
      } else {
        return res.status(200).send({ message: "No movioe found." });
      }
    })
    .catch((err) => res.status(500).send({ error: "Error finding movie." }));
};
module.exports.getMovie = (req, res) => {
  return Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) {
        return res.status(404).send({ error: "Movie not found " });
      }

      return res.status(200).send(movie);
    })
    .catch((findErr) => {
      console.error("Error finding movie: ", findErr);

      return res.status(500).send({ error: "Failed to fetch movie" });
    });
};
module.exports.getComments = async (req, res) => {
  try {
    // Find the movie by its ID
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      throw new Error("Movie not found");
    }

    // Find the specific comment within the comments array
    const comment = movie.comments;

    if (!comment) {
      throw new Error("Comment not found");
    }

    return res.status(200).send({ comments: comment });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
module.exports.updateMovie = (req, res) => {
  let movieUpdates = {
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    description: req.body.description,
    genre: req.body.genre,
  };

  return Movie.findByIdAndUpdate(req.params.id, movieUpdates)
    .then((updatedMovie) => {
      if (!updatedMovie) {
        return res.status(404).send({ error: "Movie not found" });
      }

      return res.status(200).send({
        message: "Movie updated successfully",
        updatedMovie: updatedMovie,
      });
    })
    .catch((err) => {
      console.error("Error in updating a Movie : ", err);
      return res.status(500).send({ error: "Error in updating a Movie." });
    });
};
module.exports.deleteMovie = (req, res) => {
  return Movie.deleteOne({ _id: req.params.id })
    .then((deletedResult) => {
      if (deletedResult < 1) {
        return res.status(400).send({ error: "No Movie deleted" });
      }

      return res.status(200).send({
        message: "Movie deleted successfully",
      });
    })
    .catch((err) => {
      console.error("Error in deleting a Movie : ", err);
      return res.status(500).send({ error: "Error in deleting a Movie." });
    });
};
module.exports.addComment = (req, res) => {
  return Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) {
        return res.status(404).send({ error: "Movie not found" });
      }

      const { comment } = req.body;
      const userId = req.user.id;

      movie.comments.push({ userId, comment });

      return movie.save().then((updatedMovie) => {
        return res.status(200).send({
          message: "Comment added successfully",
          updatedMovie,
        });
      });
    })
    .catch((findErr) => {
      console.error("Error finding movie: ", findErr);
      return res.status(500).send({ error: "Failed to fetch movie" });
    });
};
