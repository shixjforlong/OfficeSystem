define(function(require) {
    require("cloud/base/cloud");
    var Service = Class.create({
        initialize: function(){
        },
       
        deletevipById: function(id, callback, context) {
        	$.ajax({
                url: "/sapi/vip/" + id,
                type: "DELETE",
                success: function(data) {
                    callback.call(context || this, data);
                }
            });
        },
        getAllvip: function(searchData, limit, cursor, callback, context) {
            var self = this;
            var url="/sapi/vip/list?limit="+limit+"&cursor="+cursor;
            if(searchData.levelName){
            	url = url+"&levelName="+searchData.levelName;
            }
            $.ajax({
                url: url,
                type: "GET",
                success: function(data) {
                    callback.call(context || self, data);
                }
            });
        },
        addvip:function(data,callback,context){
        	$.ajax({
				url:"/sapi/vip/add",
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
        getvipInfoById: function(id, callback, context) {
            
        	$.ajax({
                url: "/sapi/vip/"+id,
                type: "GET",
                success: function(data) {
                    callback.call(context || self, data);
                }
            });
        },
        updatevip: function(id,contentData, callback, context) {
            var self = this;
            $.ajax({
                url: "/sapi/vip/"+ id,
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