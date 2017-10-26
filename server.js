// Get the packages we need
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    secrets = require('./config/secrets'),
    bodyParser = require('body-parser');

// Create our Express application
var app = express();

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Connect to a MongoDB
mongoose.connect(secrets.mongo_connection);

mongoose.Promise = global.Promise

// Allow CORS so that backend and frontend could be put on different servers
var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
};
app.use(allowCrossDomain);

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//include routes
let userRoute = require('./routes/user.js')
let taskRoute = require('./routes/task.js')

// Use routes as a module (see index.js)
// require('./routes')(app, router);
app.use('/api/users', userRoute);
app.use('/api/tasks', taskRoute);

// Start the server
app.listen(port);
console.log('Server running on port ' + port);


/*
    references:
    http://mongoosejs.com/docs/index.html
    https://coursework.vschool.io/mongoose-crud/
    https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
*/
