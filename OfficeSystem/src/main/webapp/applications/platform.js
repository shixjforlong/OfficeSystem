define(function(require) {
	require("cloud/base/cloud");
    require("cloud/lib/plugin/jquery-ui");
    require("cloud/lib/plugin/jquery.watermark");
    require("cloud/lib/plugin/jquery.qtip");
    require("cloud/lib/plugin/jquery.layout");
    //cloud.Ajax.checkLogin();	
    var Platform = Class.create({
        initialize: function() {
           this.navs=[];
           this.render();
        },
        render:function(){
 		  	var appConfig = cloud.appModules.modules;
 		  	var config={};
 		  	
 		  	if(appConfig && appConfig.length>0){
				var nomal_appConfig = [];
				for(var i=0;i<appConfig.length;i++){
				   nomal_appConfig.push(appConfig[i]);
				}
				var appModules  =  nomal_appConfig;
				config.modules = appModules;
			}
 		   console.log(config);
 		   this.loadMenu(config);
 		   this.getState();
 		   $("#userName").text(window.sessionStorage.getItem("userName")+" "+window.sessionStorage.getItem("shopName"));
        },
        getState:function(){
        	var number = window.sessionStorage.getItem("number");
        	if(number =="0"){
        		number="";
        	}
        	//接单提醒
        	var url="/wapi/orderState?state=0";
        	if(number){
        		url=url+"&number="+number;
        	}
        	var eventSource =  new EventSource(url);
        	eventSource.onmessage = function(event) {
             	if(event && event.data){
             		var audio = document.getElementById("new");
             		if(event.data>0){
             			$("#getOrder").text(event.data);
             			audio.play();//播放
             		}else{
             			audio.pause();//暂停
             			$("#getOrder").text("");
             		}
             	}
        	 };
        	 //催单提醒
        	var url_re="/wapi/orderState?reminderState=1";
         	if(number){
         		url_re=url_re+"&number="+number;
         	}
         	var eventSource_re =  new EventSource(url_re);
         	eventSource_re.onmessage = function(event) {
              	if(event && event.data){
              		var audio = document.getElementById("cuidan");
              		if(event.data>0){
              			$("#remindOrder").text(event.data);
              			audio.play();//播放
              		}else{
              			audio.pause();//暂停
              			$("#remindOrder").text("");
              		}
              	}
         	 };
         	 
         	 //取消订单
         	var url_cancel="/wapi/orderState?cancelState=1&payState=3";//支付成功后取消的
         	if(number){
         		url_cancel=url_cancel+"&number="+number;
         	}
         	var eventSource_cancel =  new EventSource(url_cancel);
         	eventSource_cancel.onmessage = function(event) {
              	if(event && event.data){
              		var audio = document.getElementById("cancel");
              		if(event.data>0){
              			$("#cancelOrder").text(event.data);
              			audio.play();//播放
              		}else{
              			audio.pause();//暂停
              			$("#cancelOrder").text("");
              		}
              	}
         	 };
        },
        loadMenu:function(config){
        	 var self = this;
             var appModules = config;
				
             appModules.modules.each(function(m){
             	if(m.subNavs[0].defaultShow){
             		self.navs.push(m);
             	}
             });
             var loadArray=[];
             for(var index=0;index<self.navs.length;index++){
            	  var one = self.navs[index];
                  if(one.subNavs && one.subNavs.length>0){
                		 if(one.subNavs[0].subModule && one.subNavs[0].subModule.length>0){//有二级菜单
                			var $htmls_two = '';
	                		 one.subNavs[0].subModule.each(function(two_child){
	                			 var obj={loadObj:two_child,id:two_child.name};
                				 loadArray.push(obj);
	                		 });
	                		 
	                     }else{//没有二级菜单  首页
	                    	 if (one.subNavs[0].url){
	                    		 this.loadApplication(one.subNavs[0]);
	                    	 }
	                     }
                   }
             }
            
             $(".oneMenu").click(function(){
            	 $(".oneMenu ul").attr("style",{"display":"none"});
            	 $("#"+$(this)[0].children[1].id).css("display","block");
            	 $("li").removeClass("active");
            	 $(this).addClass("active");
             });
             
             $(".loadApp").click(function(){
            	
	    		 if(loadArray.length>0){
	    			 for(var i=0;i<loadArray.length;i++){
	    				 if($(this)[0].id == loadArray[i].id){
	    					 self.loadApplication(loadArray[i].loadObj);
	    				 }
	    			 }
	    		 }
	    		 
	         });
        },
        //加载具体应用的函数，这是核心方法
        loadApplication: function(application) {
            var msg = this.msgToSend;
            this.msgToSend = null;            
            var appUrl = application.url;
        	cloud.util.setCurrentApp(application);
            if (this.currentApplication && Object.isFunction(this.currentApplication.destroy)) {
                this.currentApplication.destroy();
                this.currentApplication = null;
            }           
            if (appUrl.endsWith(".html")) {
                $("#user-content").load(appUrl);
                this.appNow = application;
                msg && this.sendMsg(application.name, msg);
            } else {
                cloud.util.mask("#user-content");
                this.requestingApplication = appUrl;
                require([appUrl], function(Application) {
                    //judge if the previous requesting application is canceled.
                    if (this.requestingApplication === appUrl) {
                        if (this.currentApplication && Object.isFunction(this.currentApplication.destroy)) {
                            this.currentApplication.destroy();
                            this.currentApplication = null;
                        }
                        $("#user-content").empty();
                        cloud.util.unmask("#user-content");
                        if (Application) {
                            this.currentApplication = new Application({
                                container: "#user-content"
                            });
                            this.appNow = application;
                            msg && this.sendMsg(application.name, msg);
                        }
                    }else{
                        console.log("app ignored: " + appUrl)
                    }
                }.bind(this));
            }
        },
        sendMsg : function(appName, msg){
            cloud.message.post("cloud.platform.apps." + appName, "onLoad", msg);
        }
    });
    return Platform;
});