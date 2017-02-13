define(function(require) {
    require("cloud/base/cloud");
    var Service = Class.create({
        initialize: function(){
        },
        deletebusinessById: function(id, callback, context) {
        	$.ajax({
                url: "/sapi/business/" + id,
                type: "DELETE",
                success: function(data) {
                    callback.call(context || this, data);
                }
            });
        },
        addBusiness:function(data,callback,context){
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
        },
        getAllbusiness: function(searchData, limit, cursor, callback, context) {
            var self = this;
            var url="/sapi/business/list?limit="+limit+"&cursor="+cursor;
            if(searchData.name){
            	url = url+"&name="+searchData.name;
            }
            $.ajax({
                url: url,
                type: "GET",
                success: function(data) {
                    callback.call(context || self, data);
                }
            });
        },        
    });

    return new Service();
    
});