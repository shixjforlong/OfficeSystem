define(function(require) {
    require("cloud/base/cloud");
    require("cloud/lib/plugin/jquery.multiselect");
    require("cloud/lib/plugin/jquery-ui");
    require("cloud/resources/css/jquery.multiselect.css");
    var configHtml = require("text!./config.html");
    var Service = require("./service");
    var configuration = Class.create(cloud.Component, {
        initialize: function($super, options) {
            $super(options);
            this.render();
        },
        render: function() {
            var self = this;
            this.renderHtml();
            locale.render({element: self.element});
            $(".static_div_height").css("width",$(".wrap").width());
            this.getConfig();
            this.bindBtnEvents();
            this.getData();
        },
        renderHtml: function() {
            var self = this;
            self.element.html(configHtml);
        },
        getConfig: function() {
            var name = $("#name").val();
            var phone = $("#phone").val();
            var address = $("#address").val();
            var servicetime = $("#servicetime").val();
            var service = $("#service").val();
            var activity = $("#activity").val();
            
            var config = {
            		number:'shiguo',
            		name:name,
            		phone:phone,
            		address:address,
            		servicetime: servicetime,
            		service:service,
            		activity:activity
            };
            return config;
        },
        setConfig: function(data) { 
            $("#name").val(data.name);
            $("#phone").val(data.phone);
            $("#address").val(data.address);
            $("#servicetime").val(data.servicetime);
            $("#service").val(data.service);
            $("#activity").val(data.activity);
        	
        },
        bindBtnEvents: function() {
            var self = this;
            
            $("#sms-config-save").click(function() {
                var config = self.getConfig();
                
                if(config.name =="" || config.name==null){
               	 dialog.render({text:"商家名称不能为空"});
       			 return;
               }
               if(config.phone =="" || config.phone==null){
              	     dialog.render({text:"客服电话不能为空"});
      			     return;
               }
               if(config.address =="" || config.address==null){
             	     dialog.render({text:"商家地址不能为空"});
     			     return;
               }
               if(config.servicetime =="" || config.servicetime==null){
            	     dialog.render({text:"营业时间不能为空"});
    			     return;
               }
                
                cloud.util.mask(self.element);
                var number="shiguo";
                Service.getBusinessConfig(number, function(data) {
                    if (data && data.result.length>0) {
                        Service.updateBusinessConfig(number, config, function(data) {
                        	dialog.render({text:"保存成功"});
                            //self.setConfig(data.result);
                        });
                    } else {//添加
                        Service.createBusinessConfig(config, function(data) {
                        	dialog.text({lang:"保存成功"});
                            //self.setConfig(data.result);
                        });
                    }
                    cloud.util.unmask(self.element);
                });

            });
        },
        getData: function() {
            var self = this;
            cloud.util.mask(this.element);
            var number="shiguo";
            Service.getBusinessConfig(number, function(data) {
	            if (data && data.result.length>0) {
	                self.setConfig(data.result[0]);
	            }
	            cloud.util.unmask(self.element);
	        });
        }
    });
    return configuration;
});