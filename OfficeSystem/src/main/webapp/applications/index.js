require(["./platform","cloud/base/cloud","cloud/components/permission_","cloud/lib/plugin/jquery.datetimepicker"], function(Platform,cloud,Permission) {
	$(function() {
		
		window.permission = new Permission({
			events:{
				afterLoad:function(){
					require([CONFIG.appConfig], function(appConfig){
						cloud.appModules = appConfig;
						cloud.platform = new Platform();
					});
				}
			}
		});
	});
});
