/**
 * 配置路由
 */
app.config(function($routeProvider, $locationProvider){
	$routeProvider
		.when('/room',{
			templateUrl: '/room.html',
			controller: 'roomCtrl'
		})
		.when('/login',{
			templateUrl: '/login.html',
			// controller: 'loginCtrl'
		})
		.otherwise({
			redirecTo:'/login'
		})

	// 使用了HTML5的API pushState来实现路由
	$locationProvider.html5Mode(true);
})