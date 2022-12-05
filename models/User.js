const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    username :{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please type a valid email address"]
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: "Thought"
}],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
})

const User = model("User", UserSchema);

module.exports = User;