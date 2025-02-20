const router = require('express').Router();
const commentRouters = require('./comment.routes')
const formatResponse = require('../utils/formatResponse');


router.use('/comment', commentRouters)

router.use('*',(req, res)=>{
    res.status(404).json(formatResponse(404, 'Not found'));
});

module.exports=router;