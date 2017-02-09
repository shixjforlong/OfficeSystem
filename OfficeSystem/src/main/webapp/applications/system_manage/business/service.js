define(function(require) {
    require("cloud/base/cloud");
    var Service = Class.create({
        initialize: function(){
        },
        
        createBusinessConfig:function(data,callback,context){
        	$.ajax({
				url:"/sapi/business/add",
				type : "post",
				"contentType": "application/json", 
				data:JSON.stringify(data),
				success: function(data) {
	                callback.call(context || self, data);
	            },
	            error: function(data) {
	                callback.call(context || self, data);
	            }
			});
        },
        getBusinessConfig: function(number, callback, context) {
            
        	$.ajax({
                url: "/sapi/business?number="+number,
                type: "GET",
                success: function(data) {
                    callback.call(context || self, data);
                }
            });
        },
        updateBusinessConfig: function(number,contentData, callback, context) {
            var self = this;
            $.ajax({
                url: "/sapi/business?number="+number,
                type: "PUT",
                "contentType": "application/json", 
				data:JSON.stringify(contentData),
                success: function(data) {
                    callback.call(context || self, data);
                },
                error: function(data) {
                    callback.call(context || self, data);
                }
            });
        }
    });

    return new Service();
    
});