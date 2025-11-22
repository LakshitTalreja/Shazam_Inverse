const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    email: {
        type: String,
        required: true
    },
    totalPoints: {
        type: Number,
        default: 0
    },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);