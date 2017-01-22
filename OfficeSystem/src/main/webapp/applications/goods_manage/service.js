define(function(require) {
    require("cloud/base/cloud");
    var Service = Class.create({
        initialize: function(){
        },
       
        deletegoodsById: function(id, callback, context) {
        	$.ajax({
                url: "http://localhost/sapi/goods/" + id,
                type: "DELETE",
                success: function(data) {
                    callback.call(context || this, data);
                }
            });
        },
        getAllgoods: function(searchData, limit, cursor, callback, context) {
            var self = this;
            $.ajax({
                url: "http://localhost/sapi/goods/list?limit="+limit+"&cursor="+cursor,
                type: "GET",
                success: function(data) {
                    callback.call(context || self, data);
                }
            });
        },
        addgoods:function(data,callback,context){
        	$.ajax({
				url:"http://localhost/sapi/goods/add",
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
        getgoodsInfoById: function(id, callback, context) {
            
        	$.ajax({
                url: "http://localhost/sapi/goods/"+id,
                type: "GET",
                success: function(data) {
                    callback.call(context || self, data);
                }
            });
        },
        updategoods: function(id,contentData, callback, context) {
            var self = this;
            $.ajax({
                url: "http://localhost/sapi/goods/"+ id,
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