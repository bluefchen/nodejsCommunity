const router = require('express').Router();
const questionAPI = require("../controllers/question");
const auth = require("../middlewares/auth");


// 获取一条问题的信息
router.get('/q/:qid', questionAPI.getOneById);

// 获取该问题的话题信息
router.get('/questions/:tid', questionAPI.getTopic);

// 获取问题的总数
router.get('/question/count', questionAPI.getCount);

// 分页功能  通过updataTime排序
router.get('/question/portion/:pageIndex', questionAPI.getByPageIndex);

// 获取所有的问题
router.get('/question/all', questionAPI.getAll);

// 添加一条问题
router.post('/question/add',auth.isLogin, questionAPI.createOne);


module.exports = router;