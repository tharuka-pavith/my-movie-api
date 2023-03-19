const express = require('express');
/********************** Import Models *************************/
const UserModel = require('../models/userModel');
const MovieModel = require('../models/movieModel');
const ReviewModel = require('../models/reviewModel');
const WatchlistModel = require('../models/watchlistModel');

//Router
const router = express.Router();

/********************** User routes *************************/
//Post Method
router.post('/users', async (req, res) => {
    console.log(`User post request ${req.body}`);
    const data = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password:req.body.password
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

//Login an existing user
router.post('/users/login', async(req, res) => {
    try {
        const data = await UserModel.find({
            name: req.body.name,
            password: req.body.password
        });
        res.json(data) //send the data if login is correct
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

//Get the user details for a given user ID
router.get('/users/:userId', async (req, res) => {
    console.log(req.params.userId);
    try {
        const data = await UserModel.find({
            _id: req.params.userId
        });
        res.json(data);//send the data if user is availabel
    }
    catch (error) {
        res.status(400).json({message: error.message});
    }
    
});

//Update the user details for a given user ID
router.patch('/users/:userId',async (req, res) => {
    try {
        const id = req.params.userId;
        const updatedData = req.body;
        const options = { new: true };

        const result = await UserModel.findByIdAndUpdate(
            id, updatedData, options
        )
        res.send(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

//Delete by ID Method
router.delete('/users/:userId',async (req, res) => {
    try {
        const id = req.params.userId;
        const data = await UserModel.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});


/******************** Movie Routes ***********************/
//Create a new movie
router.post('/movies', async (req, res) => {
    const data = new MovieModel({
        title: req.body.title,
        year: req.body.year,
        genre: req.body.genre,
        director: req.body.director,
        actors: req.body.actors,
        plot: req.body.plot
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

//Get a list of all movies
router.get('/movies', async (req, res) => {
    try{
        const data = await MovieModel.find();
        res.json(data);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

//Get the movie details for a given movie ID
router.get('/movies/:movieId', async (req, res) => {
    try{
        const data = await MovieModel.findById(req.params.movieId);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

//Update the movie details for a given movie ID
router.patch('/movies/:movieId', async (req, res) => {
    try {
        const id = req.params.movieId;
        const updatedData = req.body;
        const options = { new: true };
        const result = await MovieModel.findByIdAndUpdate(
            id, updatedData, options
        )
        res.send(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

//Delete a movie with a given movie ID
router.delete('/movies/:movieId', async (req, res) => {
    try {
        const id = req.params.movieId;
        const data = await MovieModel.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});


/******************** Review management routes ***********************/
//Create a new review for a given movie ID
router.post('/movies/:movieId/reviews', async (req, res) => {
    const data = new ReviewModel({
        user_id: req.body.user_id,
        movie_id: req.params.movieId,
        review: req.body.review,
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

//Get all the reviews for a given movie ID
router.get('/movies/:movieId/reviews', async (req, res) => {
    try{
        const data = await ReviewModel.find({
            movie_id:req.params.movieId
        });
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

//Get the review details for a given review ID for a given movie ID
router.get('/movies/:movieId/reviews/:reviewId', async(req, res) => {
    try{
        const data = await ReviewModel.find({
            _id: req.params.reviewId,
            movie_id:req.params.movieId
        });
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

//Update the review details for a given review ID for a given movie ID
router.patch('/movies/:movieId/reviews/:reviewId', async (req, res) => {
    try {
        const id = req.params.reviewId;
        const updatedData = req.body;
        const options = { new: true };
        const result = await ReviewModel.findByIdAndUpdate(
            id, updatedData, options
        )
        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

//Delete a review with a given review ID for a given movie ID
router.delete('/movies/:movieId/reviews/:reviewId', async(req, res) => {
    try {
        const id = req.params.reviewId;
        const data = await ReviewModel.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});




/******************** Watchlist management routes ***********************/
//Add a movie to the watchlist for a given user ID
router.post('/users/:userId/watchlist', async(req, res) => {
    const movieList = WatchlistModel.find({
        user_id: req.params.userId
    }).movie_ids;

    const newList = movieList.concat(req.body.movie_ids);

    const data = new WatchlistModel({
        user_id: req.params.userId,
        movie_ids: newList
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

//Get the watchlist for a given user ID
router.get('/users/:userId/watchlist', async (req, res) => {
    try{
        const data = await WatchlistModel.find({
            user_id:req.params.userId
        });
        res.json(data);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});


//Export router
module.exports = router;