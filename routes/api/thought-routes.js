const router = require("express").Router();

const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
} = require("../../controllers/thought-controller");

//GET all and POST new at api/thoughts
router
.route("/thoughts")
.get(getAllThought)
.post(createThought);

//GET one, PUT one, DELETE at api/thoughts/:id
router
.route("/thoughts/:id")
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

module.exports = router;