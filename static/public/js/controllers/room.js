
/**
 * 获取全部消息
 */
app.controller('roomCtrl',
['$scope', 'socket', '$cookies', 'tools', function($scope, socket, $cookies, tools){

	//发送消息
	$scope.messages = [];
	socket.emit('getAllMessages');
	socket.on('allMessages', function(data){
		$scope.messages = data;
	})
	socket.on('messageAdded', function(data){
		$scope.messages.push(data);
	})

	//用户上线
	var userOnline = $cookies.user;

	//发送用户上线信号
	socket.emit('online', userOnline);
	socket.on('online', function (data) {
		$scope.userList = data;
		$scope.userCount = tools.getObjLength(data)
	});

	//接收用户下线信号
	socket.on('offline', function (data) {
		$scope.userList = data;
		$scope.userCount = tools.getObjLength(data)
	});

	//为移动端优化的用户列表
	$scope.showList = false;
	$scope.showUserList = function(){
		$scope.showList = !$scope.showList;
	}
}])

/**
 * 添加消息
 */
app.controller('messageCreatorCtrl',function($scope, socket, $cookies, tools){
	var cookies = $cookies.user;

	$scope.newMessage = '';
	$scope.createMessage = function(){
		if($scope.newMessage == ''){
			return
		}
		var data = {
			'message': $scope.newMessage,
			'time': tools.getCurTime(),
			'userName': cookies
		}
		socket.emit('createMessage', data);
		$scope.newMessage = '';
	}
})
