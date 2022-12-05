const { Schema, model } = require("mongoose");

const ThoughtSchema = new Schema({
    thoughtText :{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    reactions: [{
        type: Schema.Types.ObjectId,
        ref: "Reaction"
    }]
},
{
    toJSON: {
        virtuals: true,
    },
    id: false
}
);

ThoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
})

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;