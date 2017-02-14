define(function(require) {
    require("cloud/base/cloud");
    var Service = Class.create({
        initialize: function(){
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
        deleteUserById: function(id, callback, context) {
        	$.ajax({
                url: "http://localhost/sapi/user/" + id,
                type: "DELETE",
                success: function(data) {
                    callback.call(context || this, data);
                }
            });
        },
        getAllUser: function(searchData, limit, cursor, callback, context) {
            var self = this;
            $.ajax({
                url: "http://localhost/sapi/user/list?limit="+limit+"&cursor="+cursor,
                type: "GET",
                success: function(data) {
                    callback.call(context || self, data);
                }
            });
        },
        addUser:function(data,callback,context){
        	$.ajax({
				url:"http://localhost/sapi/user/add",
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
        getUserInfoById: function(id, callback, context) {
            
        	$.ajax({
                url: "http://localhost/sapi/user/"+id,
                type: "GET",
                success: function(data) {
                    callback.call(context || self, data);
                }
            });
        },
        updateUser: function(id,contentData, callback, context) {
            var self = this;
            $.ajax({
                url: "http://localhost/sapi/user/"+ id,
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