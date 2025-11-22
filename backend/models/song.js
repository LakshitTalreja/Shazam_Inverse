const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
    artistName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    clip1s: String,
    clip2s: String,
    clip5s: String
}, { timestamps: true });

module.exports = mongoose.model("Song", SongSchema);
