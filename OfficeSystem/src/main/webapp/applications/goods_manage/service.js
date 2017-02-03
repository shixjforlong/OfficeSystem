define(function(require) {
    require("cloud/base/cloud");
    var Service = Class.create({
        initialize: function(){
        },
        
        getAllGoodsType: function(searchData, limit, cursor, callback, context) {
            var self = this;
            $.ajax({
                url: "/sapi/goodsType/list?limit="+limit+"&cursor="+cursor,
                type: "GET",
                success: function(data) {
                    callback.call(context || self, data);
                }
            });
        },
       
        deleteGoodsById: function(id, callback, context) {
        	$.ajax({
                url: "/sapi/goods/" + id,
                type: "DELETE",
                success: function(data) {
                    callback.call(context || this, data);
                }
            });
        },
        getAllgoods: function(searchData, limit, cursor, callback, context) {
            var self = this;
            $.ajax({
                url: "/sapi/goods/list?limit="+limit+"&cursor="+cursor,
                type: "GET",
                success: function(data) {
                    callback.call(context || self, data);
                }
            });
        },
        addGoods:function(data,callback,context){
        	$.ajax({
				url:"/sapi/goods/add",
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
        getGoodsInfoById: function(id, callback, context) {
            
        	$.ajax({
                url: "http://localhost/sapi/goods/"+id,
                type: "GET",
                success: function(data) {
                    callback.call(context || self, data);
                }
            });
        },
        updateGoods: function(id,contentData, callback, context) {
            var self = this;
            $.ajax({
                url: "/sapi/goods/"+ id,
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