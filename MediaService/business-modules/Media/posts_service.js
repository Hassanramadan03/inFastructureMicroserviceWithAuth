const posts = require('./../../models/posts');

module.exports = {
    addPost,
    viewAllPosts,
    updatePostById,
    deletePostById
}

async function addPost(postObj) {
    try {
       
        const _newPost = new posts(postObj)
        console.log(_newPost);
        
        const post =await _newPost.save();
        console.log(post);
        
        if(post)return post;
        else return 'error'
    } catch (error) {
        return error;
    }
}

async function viewAllPosts() {
    try {
        // get all posts from database
        return "all posts";
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function updatePostById(postObj) {
    try {
        const is_exist = await posts.count({
            where: { id: postObj.id }
        });
        if (!is_exist) {
            throw 'id not exist'
        }
        const post = await posts.update(postObj,
            {
                where: {
                    id: postObj.id
                }
            })
        const message = new SuccessMessage(SuccessMessage.UPDATING_OBJECT_SUCCESS, post);
        return message;
    } catch (error) {
        console.log(error);
        const errorMessage = new ErrorMessage(ErrorMessage.UPDATING_OBJECT_ERROR, error);
        return errorMessage;
    }
}

async function deletePostById(id) {
    try {
        const is_exist = await posts.count({
            where: { id: id }
        });
        if (!is_exist) {
            const errorMessage = new ErrorMessage(ErrorMessage.INVALID_PARAMS, 'not exist')
            throw 'id not exist';
        }
        const post = await posts.destroy({
            where: {
                id: id
            }
        });
        const message = new ErrorMessage(ErrorMessage.DELETING_OBJECT_ERROR, post)
        return message;
    } catch (error) {
        console.log(error);
        // if(error typeof ErrorMessage) {
        //     return error
        // }
        const errorMessage = new ErrorMessage(ErrorMessage.DELETING_OBJECT_ERROR, error)
        return errorMessage;
    }
}