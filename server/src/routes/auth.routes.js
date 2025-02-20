const router = require('express').Router()
const AuthController = require('../controllers/Auth.controller')
const verifyRefreshToken = require('../middleware/verifyRefreshToken')

router.get('/refreshTokens',verifyRefreshToken,AuthController.refreshToken)
router.post('/signUp',AuthController.signUp)
router.post('/signIn',AuthController.signIn)
router.get('/signOut',AuthController.signOut)

module.exports = router

