const { User, Thought }  = require("../models");

const userController = {
    //get all Users
    getAllUser(req, res) {
        User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //get one User by ID
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate([{
            path: "thoughts",
            select: "-__v"
        }, {
            path: "friends",
            select: "-__v"

    }])
        .select("-__v")
        .then(dbUserData => {
        // If no user is found, send 404
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(dbUserData);
        })
      .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //create user
    createUser({body}, res) {
        console.log(body);
        User.create(body) 
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    //update user detail
    updateUser({params, body}, res) {
        User.findOneAndUpdate({_id: params.id}, body, {new: true})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: "No user found with this Id!"});
                return;
            } 
            res.json(dbUserData);
        })
        .catch(err => 
            res.status(400).json(err)
        );
    },

    //deleting user
    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: "No user found with this Id!"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err=> 
            res.status(400).json(err)
        );
    },

    //add friend
    addFriend({params},res) {
        User.findOneAndUpdate(
            {_id: params.id},
            {$push: {friends: params.friendId}},
            {new: true}
    )
    .then(dbUserData => {
        if(!dbUserData) {
            res.json(404).json({ message: "No user found with this id!"});
            return;
        }
        res.json(dbUserData)
    })
    .catch(err => res.status(400).json(err));
    },

    //delete friend
    removeFriend({params}, res) {
        User.findOneAndUpdate(
            {_id: params.id}, 
            {$pull: {friends: params.friendId}},
            {new: true}
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id!"});
                return;
            }
            res.json(dbUserData)
        }
            )
        .catch(err => res.status(400).json(err));
    },


};

module.exports = userController;