const router = require('express').Router();
const formatResponse = require('../utils/formatResponse');




router.use('*',(req, res)=>{
    res.status(404).json(formatResponse(404, 'Not found'));
});

module.exports=router;