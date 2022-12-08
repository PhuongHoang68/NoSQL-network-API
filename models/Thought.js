const { Schema, model } = require("mongoose");
const moment = require("moment");
const ReactionSchema = require("./Reaction");

const ThoughtSchema = new Schema({
    thoughtText :{
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timeSince => moment(timeSince).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
}, {
    toJSON: {
        getters: true,
        virtuals: true,
    },
    id: false
}
);

ThoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
})

const Thought = model("Thought", ThoughtSchema);
// console.log(Thought.prototype);

module.exports = Thought;