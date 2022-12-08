const { Thought, User }  = require("../models");

const thoughtController = {
    //get all Thoughts
    getAllThought(req, res) {
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //get one Thought by ID
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .then(dbThoughtData => {
        // If no thought is found, send 404
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(dbThoughtData);
        })
      .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //create thought
    createThought({body}, res) {
        console.log(body);
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: body.userId},
                {$push: { thoughts: _id }},
                { new: true }
            );
        }) 
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);

            res.status(400).json(err)
        });
        
    },

    //update thought detail
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.id}, body, {new: true})
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: "No thought found with this Id!"});
                return;
            } else {
                res.json(dbThoughtData);
            }
        })
        .catch(err => 
            res.status(400).json(err)
        );
    },

    //deleting thought
    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.id})
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: "No user found with this Id!"});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err=> 
            res.status(400).json(err)
        );
    }


};

module.exports = thoughtController;