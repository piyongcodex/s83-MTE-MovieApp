const express = require("express");
const movieController = require("../controllers/movie");

const { verify, verifyAdmin } = require("../auth");

const router = express.Router();

router.post("/addMovie", verify, verifyAdmin, movieController.addMovie);
router.get("/getComments/:id", verify, movieController.getComments);
router.get("/getAllMovies", verify, movieController.getAllMovies);
router.get("/getMovie/:id", verify, movieController.getMovie);
router.patch(
  "/updateMovie/:id",
  verify,
  verifyAdmin,
  movieController.updateMovie
);
router.patch("/addComment/:id", verify, movieController.addComment);
router.delete(
  "/deleteMovie/:id",
  verify,
  verifyAdmin,
  movieController.deleteMovie
);

module.exports = router;
