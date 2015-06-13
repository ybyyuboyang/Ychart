
/**
 * 封装取消回车事件的指令
 */

app.directive('ctrlEnterBreakLine', function(){
    	return function(scope, element, attrs){
    		var ctrlDown = false;

    		element.bind("keydown",function(event){
    			if(event.which === 17){
    				ctrlDown = true;
    				setTimeout(function(){
    					ctrlDown = false
    				}, 1000);
    			}
    			if(event.which === 13){
    				if(ctrlDown){
    					element.val(element.val() + '\n')
    				}else{

                        //如浏览器DOM事件，setTimeout执行，这种情况下，angular无法获取到事件
                        scope.$apply(function(){
                            scope.$eval(attrs.ctrlEnterBreakLine);
                        })
    					event.preventDefault();
    				}
    			}
    		})
    	}
    });

/**
 * 封装自动滚动底部的指令
 */
app.directive('autoScrollToBottom', function(){
	return function(scope, element, attrs){
			scope.$watch(
				function(){
					return element.children().length;
				},
				function(){
					element.animate({
						scrollTop: element.prop('scrollHeight')
					},1000)
				}
			)
		}
    });