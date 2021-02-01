const userRouter = require('express').Router();
const { getUserInfo } = require('../controllers/user-controller.js');

userRouter.get('/me', getUserInfo);

module.exports = userRouter;
