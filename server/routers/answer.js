const router = require('express').Router();
const answerAPI = require("../controllers/answer");
const auth = require("../middlewares/auth");


router.post('/answer/add',auth.isLogin, answerAPI.createOne);


module.exports = router;