const mime = require('mime-types');
const exec = require('child-process-promise').exec;
const shortid = require('shortid');
const path = require('path');
const rootPath = path.resolve(__dirname, '../../');
const postsService = require('./posts_service');

module.exports = {
    addPost
}

async function addPost(postObj, uploadedFile, filesavedname) {
    try {
        
        let fileName = !uploadedFile ? null : uploadedFile.originalname;
        const fileType = mime.lookup(fileName);
        const extractedType = fileType.substring(0, 5);
        if (!uploadedFile) {
            postObj.post_data_type = 'status';
            postObj.for_sale = false;
            return 'there is no file ';
        } else if (extractedType == 'image') {
            postObj.post_data_type = 'image';
            postObj.post_url = `http://localhost:8070/static/Images/${filesavedname}`;
            return await postsService.addPost(postObj);
        } else if (extractedType == 'video') {
            const thumbnail = shortid.generate();
            await exec('ffmpeg -i ' + rootPath + "/static/Videos/" + filesavedname + ' -ss 00:00:01 -vframes 1 ' + rootPath + "/static/Videos/" + thumbnail + '.jpg')
            postObj.post_data_type = 'video';
            postObj.post_url = `http://localhost:8070/static/Videos/${filesavedname}`;
            return await postsService.addPost(postObj);
        }
    } catch (error) {
        return error
    }
}