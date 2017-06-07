
const multer = require('multer');
const encrypt = require('./utils/encrypt')

const storage = multer.diskStorage({
	destination: './www/images/avatar',
	filename: function(req, file, cb){
		var name = encrypt.useMD5(req.cookies.signerID + '' + new Date().getTime())
		var fileType = file.originalname;
		var arr = fileType.split('.');
		fileType = arr[arr.length-1];
		cb(null, name + '.' + fileType);
	}
});

const uploads = multer({storage});

module.exports = {uploads};