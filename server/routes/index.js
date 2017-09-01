const express = require('express');
const router = express.Router();
const model = require('../mongo/db');
const getua = require('ifun/ua');
const getip = require('ifun/ip');



const Register = (req, res) => {
	let userRegister = new model.User({
		email: req.body.name,
		password: req.body.password,
		name: req.body.name,
		age: req.body.age,
	})
	var ua = getua(req.headers['user-agent']);
	// console.log(ua);
	var ip = getip.getClientIp(req);
	console.log(req)
	model.User.findOne({
		email: userRegister.email
	}, (err, doc) => {
		if(err) console.log(err)
		// 用户名已存在，不能注册
		if(doc) {
			res.json({
				success: false,
				message: '用户名已存在，不能注册'
			})
		} else {
			userRegister.save(err => {
				if(err) console.log(err)
				console.log('register success')
				res.json({
					success: true
				})
			})
		}
	})
}

router.post('/login', Register);
router.post('/home', function (req, res) {
    res.send('home');
})

module.exports = router;