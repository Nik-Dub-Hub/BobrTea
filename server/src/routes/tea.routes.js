const router =require('express').Router()
const TeaController = require('../controllers/Tea.controller')
const verifyAccessToken = require('../middleware/verifyAccessToken')


router 
      .get('/', TeaController.getAllTeas)
      .get('/:id', TeaController.getTeaById)
      .post('/', verifyAccessToken, TeaController.createTea)
      .put('/:id', TeaController.updateTea)
      .delete('/:id', TeaController.deleteTea)

      module.exports= router