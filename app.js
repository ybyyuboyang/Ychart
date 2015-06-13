var express = require('express'),
	swig = require('swig'),
	cons = require('consolidate'),
	cookieParser = require('cookie-parser'),
	bodyParser = require("body-parser"),
	chart = require('./routes/chart/index'),
	port = process.env.PORT || 10086,
	app = express(),

	// 服务器监听connection事件
	io = require('socket.io').listen(app.listen(port)),
	socket = require('./controller/socket/index');

// 配置模板
swig.setDefaults({ varControls: ['<%', '%>'] });
app.engine('.html', cons.swig)
app.set('view engine', 'html')

// 设置根目录
app.set('views', __dirname + '/static/views');

// 设置静态资源目录
app.use(express.static(__dirname + '/static/public'));

// 使用cookieParser中间件（get&set cookie）
app.use(cookieParser())

// 设置两种接受json的方式
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 设置路由模块
app.use('/', chart);

// 使用封装的soket方法
socket.createSocket(io);

console.log('started on port:'+port);











