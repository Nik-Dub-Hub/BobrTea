const router = require('express').Router();
const teaRoutes = require('./tea.routes')
const formatResponse = require('../utils/formatResponse');
const authRoutes = require('./auth.routes')


router.use('/tea', teaRoutes)

router.use('/auth',authRoutes)


router.use('*',(req, res)=>{
    res.status(404).json(formatResponse(404, 'Not found'));
});

module.exports=router;