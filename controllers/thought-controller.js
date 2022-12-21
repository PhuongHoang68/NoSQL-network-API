const { Thought, User }  = require("../models");

//POST thought works but response shows as null, even tho everything populates
//friend routes and reaction routes

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
            } 
                res.json(dbThoughtData);
            
        })
        .catch(err => 
            res.status(400).json(err)
        );
    },

    //add reaction
    addReaction({params, body},res) {
        Thought.findOneAndUpdate(
            {_id: params.id},
            {$push: {reactions: body}},
            {new: true}
    )
    .then(dbThoughtData => {
        if(!dbThoughtData) {
            res.json(404).json({ message: "No thought found with this id!"});
            return;
        }
        res.json(dbThoughtData)
    })
    .catch(err => 
        res.status(400).json(err));
    },

    //delete reactions
    removeReaction({params}, res) {
        Thought.findOneAndUpdate(
            {_id: params.id}, 
            {$pull: {reactions: { reactionId: params.reactionId}}},
            {new: true}
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought found with this id!"});
                return;
            }
            res.json(dbThoughtData)
        }
            )
        .catch(err => 
            res.status(400).json(err));
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