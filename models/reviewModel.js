//user's ID, the movie ID, and the rating.
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    "user_id": {
        require: true,
        type: String
    },
    "movie_id": {
        require: true,
        type: String
    },
    "review": { 
        require: true, 
        type: String 
    }
});

module.exports = mongoose.model('Review', reviewSchema);