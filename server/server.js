
var express = require('express');

var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');

// var template = require('./template.cfg');

// var multer = require('./multer.cfg');
// var uploads = multer.uploads;


var app = express();

app.use(express.static('../www'));
app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json())
app.use(cookieParser());
// app.engine('.html', template.__express);
// app.set('view engine', 'html');


// 导入路由配置
app.use( require('./routers/user/register') );
app.use( require('./routers/user/login') );
app.use( require('./routers/question/question') );








// app.post('/addHeadPic', uploads.single('avatar') ,(req,res)=>{
// 	res.status(200).json({flag: 'success', msg: '上传成功！'})
// })



app.listen(3000, ()=>{
	console.log('Server running on port 3000...');
})