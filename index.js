const express = require('express');
const mongoose = require('mongoose');

//Import routes file
const routes = require('./routes/routes');

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:false,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

/** Connecting to database */
require('dotenv').config();
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection
database.on('error', (error) => {
    console.log(error)
});

database.once('connected', () => {
    console.log('Database Connected');
});


const app = express(); //transfer the contents of Express into a new constant called app.

app.use(express.json());
app.use(cors()); //cors policy
app.use('/api', routes); //Use routes file


/**Middlewear to log requests */
function logMiddlewear(req, res, next){
    console.log(`${new Date().toISOString()}: ${req.originalUrl}`);
    next();
}
app.use(logMiddlewear);
/*************************** */

/** Starting the server */
const port = 3001;
app.listen(port, () => {
    console.log(`Server started at ${port}`);
});