var mongoose = require('mongoose');
var mediaSchema = new mongoose.Schema({
    title : String,
    price :  Number,
    des:String,
    image:String,
    userId: mongoose.Schema.Types.ObjectId

   
});
module.exports = mongoose.model('media', mediaSchema);
