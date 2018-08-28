const cors = require('cors'),
    express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    helmet = require('helmet'),
    app = express();
    middleware = require('./utils/AuthMiddleWare'),
    ensureAuthenticated = middleware.authMiddleware,
    app.locals.moment = require('moment');

mongoose.connect('mongodb://localhost:27017/testNode');
// mongoose.connect(config.online , config.mongoOptions);


//routing files
const auth = require('./business-modules/auth/auth_router');

app.set('port', (process.env.PORT || 8001));

app.use(cors());

app.use(helmet());
app.use(bodyParser.json());

//parse application/vnd.api+json as json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));




// Force HTTPS on Heroku
if (app.get('env') === 'production') {
    app.use(function (req, res, next) {
        var protocol = req.get('x-forwarded-proto');
        protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
    });
}



app.use('/auth', auth);
app.use('/authorize', ensureAuthenticated(), auth);





var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    app.listen(app.get('port'), function () {
        console.log('Node app is running on port', app.get('port'));
    });
});

exports = module.exports = app;
