/**
 * 封装工具服务
 */
app.factory('tools', function($rootScope){
	return{
		getCurTime: function(eventName, callback){
			var date = new Date();
			var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds());
			return time;
		},
		getObjLength: function(o, callback){
		   var n, count = 0;  
		   for(n in o){  
		      if(o.hasOwnProperty(n)){  
		         count++;  
		      }  
		   }  
		   return count;
		}
	}
});