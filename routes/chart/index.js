var express = require('express'),
	router = express.Router();

/**
 * 用户登录
 */
router.route('/login')
	.get(function(req, res){
		if(req.cookies.user){
			res.redirect('/room');
		}else{
			res.render('index', {
				title: '登录'
			})
		}
	})
	.post(function(req, res){
		res.cookie("user", req.body.userName, {maxAge: 1000*60*60*24*30});
		res.redirect('/room');
	});

/**
 * 进入聊天室
 */
router.route('/room')
	.get(function(req, res){
		if(req.cookies.user == null){
    		res.redirect('/login');
		}else{
			res.render('index', {
				title: '聊天室'
			})
		}
	});

/**
 * 配合前端路由返回登录模板
 */
router.route('/login.html')
	.get(function(req, res){
		res.render('login', {

		})
	});

/**
 * 配合前端路由返回聊天室模板
 */
router.route('/room.html')
	.get(function(req, res){
		res.render('room', {

		})
	});

module.exports = router;
