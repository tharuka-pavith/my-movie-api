//user's ID, the movie ID, and the rating.
const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
    "user_id": {
        require: true,
        type: String
    },
    "movie_ids": {
        require: true,
        type: Array
    },
});

module.exports = mongoose.model('Watchlist', watchlistSchema);