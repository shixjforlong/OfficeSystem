define(function(require) {
    require("cloud/base/cloud");
    var Service = Class.create({
        initialize: function(){
        },
       
        deletewxuserById: function(id, callback, context) {
        	$.ajax({
                url: "/wapi/wxuser/" + id,
                type: "DELETE",
                success: function(data) {
                    callback.call(context || this, data);
                }
            });
        },
        getAllwxuser: function(searchData, limit, cursor, callback, context) {
            var self = this;
            var url="/wapi/wxuser/list?limit="+limit+"&cursor="+cursor;
            if(searchData.nickName){
            	url = url+"&nickName="+searchData.nickName;
            }
            $.ajax({
                url: url,
                type: "GET",
                success: function(data) {
                    callback.call(context || self, data);
                }
            });
        },
        addwxuser:function(data,callback,context){
        	$.ajax({
				url:"/wapi/wxuser/add",
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
        getwxuserInfoById: function(id, callback, context) {
            
        	$.ajax({
                url: "/wapi/wxuser/"+id,
                type: "GET",
                success: function(data) {
                    callback.call(context || self, data);
                }
            });
        },
        updatewxuser: function(id,contentData, callback, context) {
            var self = this;
            $.ajax({
                url: "/wapi/wxuser/"+ id,
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