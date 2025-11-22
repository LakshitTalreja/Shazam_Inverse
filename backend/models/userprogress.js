const mongoose = require("mongoose");

const UserProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    songId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
        required: true
    },
    status: {
        type: String,
        enum: ["completed", "revealed"],
        required: true
    },
    pointsEarned: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model("UserProgress", UserProgressSchema);
