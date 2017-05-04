const router = require('express').Router();
const answerAPI = require("../controllers/answer");


router.post('/answer/add', answerAPI.createOne);


module.exports = router;