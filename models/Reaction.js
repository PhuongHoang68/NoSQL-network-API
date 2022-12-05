const { Schema, model } = require("mongoose");
const moment = require("moment");

const ReactionSchema = new Schema({
    reactionId :{
        type: Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true
    },
    reactionBody: {
        type: String,
        required: true,
        unique: true,
        maxLength: 280
    },
    username: [{
        type: Schema.Types.ObjectId,
        ref: "Thought"
}],
    createdAt: [{
        type: Date,
        default: Date.now
    }]
})

const Reaction = model("Reaction", ReactionSchema);

module.exports = Reaction;