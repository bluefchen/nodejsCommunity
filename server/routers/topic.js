const router = require('express').Router();
const topicAPI = require("../controllers/topic");

router.get('/topic/all', topicAPI.getAll);

router.post('/topic/add', topicAPI.createOne);

module.exports = router;