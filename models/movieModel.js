//title, year, genre, director, actors, and plot.
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    "title": {
        require: true,
        type: String
    },
    "year": {
        type: String
    },
    "genre": {  
        type: String 
    },
    "director": {  
        type: String 
    },
    "actors": {  
        type: Array 
    },
    "plot": {  
        type: String 
    },
});

module.exports = mongoose.model('Movie', movieSchema);