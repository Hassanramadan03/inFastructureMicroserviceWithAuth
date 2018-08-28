const express = require('express');
const router = express.Router();
const postsController = require('./posts_controller');

router.get('/posts',postsController.viewAllPosts);
router.delete('/posts/',postsController.deletePostById);
router.put('/posts',postsController.updatePostById)
router.post('/posts/:id',postsController.addPost)

module.exports = router;