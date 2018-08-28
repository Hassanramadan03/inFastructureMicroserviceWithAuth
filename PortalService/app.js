var path = require('path') ,
    qs = require('querystring'),
    cors = require('cors'),
    express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    moment = require('moment'),
    helmet = require('helmet'),
    jwt = require('jwt-simple'),
    config = require('./config/config'),
    app = express();
    app.locals.moment=require('moment');
 
    var middleware = require('./utils/AuthMiddleWare');
    var ensureAuthenticated = middleware.authMiddleware;
   
mongoose.connect('mongodb://localhost:27017/testNode');
// mongoose.connect(config.online , config.mongoOptions);
   
// app.set('view engine', 'html');
// app.set('view options', { layout: false });
// app.set('views', path.join(__dirname, '/public/frontend/views/'));

//routing files
const router = require('./business-modules/router');
 

app.set('port', (process.env.PORT || 8000));

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
if (app.get('env') === 'mediaion') {
    app.use(function(req, res, next) {
        var protocol = req.get('x-forwarded-proto');
        protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
    });
}
 
 
app.use('/auth',router.auth);
 

 

app.use('/', express.static('public'));
app.use('/public/uploadimages', express.static('public/uploadimage'))
app.use('*', express.static('public'));
app.use(function(req,res,next){
    if(req.url!==('/propertyInfo'||'/addProperty'||'/profile'||'/advancedSearch'||'/applyRequest'))
    req.url='/fake';
     
     next();
})
// // bundle all our files here
// require('./app/bundle')(app);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    app.listen(app.get('port'), function() {
        console.log('Node app is running on port', app.get('port'));
    });
});

exports = module.exports = app;
