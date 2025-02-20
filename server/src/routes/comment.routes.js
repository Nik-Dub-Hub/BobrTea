const router = require('express').Router();
const verifyAccessToken = require('../middleware/verifyAccessToken');
const CommentController = require('../controllers/Comment.controller')

router
    .get('/',CommentController.getAllComments)
    
    .get('/user', verifyAccessToken, CommentController.getCommentByUserId)

    .post('/:id',  verifyAccessToken, CommentController.createComment)

    .put('/:id',  verifyAccessToken,CommentController.updateComment)

    .delete('/:id',  verifyAccessToken, CommentController.deleteComment)
    
module.exports = router