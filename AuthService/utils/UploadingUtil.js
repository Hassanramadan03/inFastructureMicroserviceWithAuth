const multer = require('multer');
const path = require('path');
const pify = require('pify');
const directoryPath = path.resolve(__dirname, '../');
let fileSavedName;
const mime = require('mime-types');
const shortid = require('shortid');
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        var x = mime.lookup(file.originalname);
        var type = (x).substring(0, 5);
        if (type == 'image') {
            callback(null, directoryPath + '/static/Images');
        } else if (type == 'video') {
            callback(null, directoryPath + '/static/Videos');
        }
    },
    filename: function (req, file, callback) {
        var ext = file.originalname.slice((file.originalname.lastIndexOf('=') + 1));
        fileSavedName = (shortid.generate() + '.' + ext).trim();
        fileSavedName = fileSavedName.replace(/\s+/g, '');
        callback(null, fileSavedName);
    }
});
let fileFilter = (req, file, cb)=>{
    var x = mime.lookup(file.originalname);
    var type = (x).substring(0, 5);
    if(req.imageOnly&&type=='video'){
        return cb(null, false)
    }
    else if(req.videoOnly&&type=='image'){
        return cb(null, false)
    }
    else{
        cb(null, true);
    }
};
var upload = pify(multer({
    storage: storage,
    fileFilter : fileFilter
}).single('userPhoto'));

module.exports = {
    upload
};