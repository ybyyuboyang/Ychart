
/**
 * 定义socket类
 */
function socketCtrol(){};

/**
 * 创建socket连接
 */
socketCtrol.createSocket = function createSocket(io){
	var messages = [],
	    users = {};

	io.sockets.on('connection', function(socket){

		// 用户消息之间的传递
		socket.on('getAllMessages', function(){
			socket.emit('allMessages', messages)
		})
		socket.on('createMessage', function(data){
			messages.push(data);
			io.sockets.emit('messageAdded', data)
		})

		// 传递用户上线消息
		socket.on('online', function (data) {
			socket.name = data;
			if (!users[data]) {
				users[data] = data;
			}
			io.sockets.emit('online', users);
		});

		// 断开socket连接
		socket.on('disconnect', function() {
			if (users[socket.name]) {

				//从 users 对象中删除该用户名
				delete users[socket.name];

				//向其他所有用户广播该用户下线信息
				io.sockets.emit('offline', users);
			}
		});
	})
}

module.exports = socketCtrol;