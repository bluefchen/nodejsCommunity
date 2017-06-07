const router = require('express').Router();
const userInfoAPI = require('../controllers/userInfo');

router.get('/u/:uid', userInfoAPI.goUserInfoPage);

router.post('/uInfo/changeAvatar', userInfoAPI.updateAvatar);


module.exports = router;
