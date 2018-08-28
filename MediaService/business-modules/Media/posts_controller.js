const renderResponseUtil = require('../../utils/RenderResponseUtil');
const postsService = require('./posts_service');
const postsApp = require('./posts_app');
const multer = require('multer');
const path = require('path');
const pify = require('pify');
const p = path.resolve(__dirname, '../..');
let img_name = "";
const mime = require('mime-types');
const shortid = require('shortid');
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        var x = mime.lookup(file.originalname);
        var type = (x).substring(0, 5);
        if (type == 'image') {
            callback(null, p + '/static/Images');
        } else if (type == 'video') {
            callback(null, p + '/static/Videos');
        }
    },
    filename: function (req, file, callback) {
        var ext = file.originalname.slice((file.originalname.lastIndexOf('=') + 1));
        img_name = (shortid.generate() + '.' + ext).trim();
        img_name = img_name.replace(/\s+/g, '');
        callback(null, img_name);
    }
});
var upload = pify(multer({
    storage: storage
}).single('userPhoto'));

module.exports = {
    viewAllPosts,
    deletePostById,
    updatePostById,
    addPost
}

async function addPost(req, res) {
    const postId = JSON.parse(req.params.id);
    
    const postObj = {
        description: postId.description,
        user_id: postId.user_id,
        uploaded_from: postId.uploaded_from,
        post_url: null,
    }
    
    
    try {
        await upload(req, res);
        const addingMessage = await postsApp.addPost(postObj, req.file, img_name);
        console.log('addingMessage' + addingMessage);
        renderResponseUtil.sendResponse(req, res, addingMessage)
    } catch (error) {
        console.log(error);
    }
}

async function viewAllPosts(req, res) {
    try {
        const posts = await postsService.viewAllPosts();
        console.log({ path: __dirname, fnction: viewAllPosts }, 'posts returned successfully');
        renderResponseUtil.sendResponse(req, res, posts)
    }
    catch (error) {
        console.log(error);
        logger.error({
            path: __dirname,
            fnction: viewAllPosts,
            user: null,
            error: error,
        }, 'posts returned error');
        renderResponseUtil.sendResponse(req, res, error)
    };
}

async function deletePostById(req, res) {
    try {
        const postId = req.params.id;
        if (postId) {
            const post = await postsService.deletePostById(postId);
            console.log({ path: __dirname, fnction: deletePostById }, 'post deleted successfully');
            renderResponseUtil.sendResponse(req, res, post)
        } else {
            const errorMessage = new ErrorMessage(ErrorMessage.INVALID_PARAMS, 'no id supplied');
            throw errorMessage;
        }
    } catch (errMsg) {
        console.log(errMsg);
        logger.error({
            path: __dirname,
            fnction: deletePostById,
            user: null,
            error: errMsg,
        }, 'post deleted error');
        renderResponseUtil.sendResponse(req, res, errMsg)
    }
}

async function updatePostById(req, res) {
    try {
        const postObj = {
            id: req.body.id,
            user_id: req.body.user_id,
            uploadedfrom: req.body.uploadedfrom,
            description: req.body.description,
            tierid: req.body.tierid,
            postid: req.body.postid,
            user_id: req.body.user_id,
            forsale: req.body.forsale
        };
        if (postObj.id) {
            const post = await postsService.updatePostById(postObj);
            console.log({ path: __dirname, fnction: updatePostById }, 'post updated successfully');
            renderResponseUtil.sendResponse(req, res, post)
        } else {
            const errorMessage = new ErrorMessage(ErrorMessage.INVALID_PARAMS, 'no id supplied');
            throw errorMessage;
        }
    } catch (errMsg) {
        console.log(errMsg);
        logger.error({
            path: __dirname,
            fnction: updatePostById,
            user: null,
            error: errMsg,
        }, 'post updated error');
        renderResponseUtil.sendResponse(req, res, errMsg)
    }
}

