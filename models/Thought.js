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
})

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;