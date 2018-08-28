var mongoose = require('mongoose');
var mediaSchema = new mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    post_data_type: String,
    uploaded_from: String,
    description: String,
    post_url: {
        type: String,
        required: true
    },

});
module.exports = mongoose.model('media', mediaSchema);
 