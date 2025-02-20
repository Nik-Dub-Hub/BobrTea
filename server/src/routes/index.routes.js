const router = require('express').Router();
const teaRoutes = require('./tea.routes')
const formatResponse = require('../utils/formatResponse');

router.use('/tea', teaRoutes)


router.use('*',(req, res)=>{
    res.status(404).json(formatResponse(404, 'Not found'));
});

module.exports=router;