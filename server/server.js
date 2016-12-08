
const express = require('express');
const app = express();

app.use(express.static('www'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json())

const cookieParser = require('cookie-parser');
app.use(cookieParser());


// const multer = require('./multer.cfg');
// const uploads = multer.uploads;


// 使用 art-template 作为模板引擎
// 和angular的语法有冲突啊!!!  TMD！
// const template = require('./template.cfg');
// app.engine('.html', template.__express);
// app.set('view engine', 'html');


// 使用 ejs 作为模板引擎
const ejs = require('ejs');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');



// 导入路由配置
app.use( require('./routers/index') )
app.use( require('./routers/user/info') );
app.use( require('./routers/user/register') );
app.use( require('./routers/user/login') );
app.use( require('./routers/question/question') );
app.use( require('./routers/answer/answer') );








// app.post('/addHeadPic', uploads.single('avatar') ,(req,res)=>{
// 	res.status(200).json({flag: 'success', msg: '上传成功！'})
// })



app.listen(3000, ()=>{
	console.log('Server running on port 3000...');
})