const router = require('express').Router();
const userAPI = require("../controllers/user");
const auth = require("../middlewares/auth");

router.post('/user/login', userAPI.login);

router.post('/user/register', userAPI.register);

router.post('/user/checkName', userAPI.checkName);

module.exports = router;