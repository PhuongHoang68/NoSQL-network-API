const router = require("express").Router();

const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    removeFriend,
    addFriend
} = require("../../controllers/user-controller");

//GET all and POST new at api/users
router
.route("/")
.get(getAllUser)
.post(createUser);

//GET one, PUT one, DELETE at api/users/:id
router
.route("/:id")
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

router
.route("/:id/friends/:friendId")
.post(addFriend)
.delete(removeFriend);

module.exports = router;