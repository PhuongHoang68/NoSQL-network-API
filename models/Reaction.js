const { Schema, model } = require("mongoose");
const { moment } = require("moment")


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
        ref: "User"
}],
    createdAt: [{
        type: Date,
        default: Date.now,
        get: timeSince => moment(timeSince).format("MMM DD, YYYY [at] hh:mm a")
    }]
},{
    toJSON: {
        getters: true
    }
})

module.exports = ReactionSchema;