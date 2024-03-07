const express = require('express');
const path = require('node:path');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const userAgent = require('express-useragent');
const dotenv = require('dotenv');
const colors = require('colors');

const errorHandler = require('./middlewares/error');
const clientHandler = require('./middlewares/client');
const connectMongoDB = require('./database/connect');
dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();

app.set('json spaces', 4);
app.set('views', path.join(__dirname, 'pages'));
app.set('view engine', 'ejs');

// router
const appRouter = require('./routes/router');
app.use('/', appRouter);

// Middlewares 
app.use(logger('combined')); // logging each request
app.use(express.json());
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(userAgent.express());
app.use(errorHandler); // API error handler middleware
app.use(clientHandler); // adds client information to req.client

// connect to mongo DB - optional: add MONGODB_URI=string to .env
connectMongoDB();

// Block unrequired actions
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PATCH,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.append('X-Frame-Options', 'SAMEORIGIN');
    next();
});

// Start the server
app.listen(PORT, () => {
    console.log(`[^]: Server is listening to: http://localhost:${PORT}`.green);
});