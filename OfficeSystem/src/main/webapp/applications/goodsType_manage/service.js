define(function(require) {
    require("cloud/base/cloud");
    var Service = Class.create({
        initialize: function(){
        },
       
        deleteGoodsTypeById: function(id, callback, context) {
        	$.ajax({
                url: "http://localhost/sapi/goodsType/" + id,
                type: "DELETE",
                success: function(data) {
                    callback.call(context || this, data);
                }
            });
        },
        getAllGoodsType: function(searchData, limit, cursor, callback, context) {
            var self = this;
            $.ajax({
                url: "http://localhost/sapi/goodsType/list?limit="+limit+"&cursor="+cursor,
                type: "GET",
                success: function(data) {
                    callback.call(context || self, data);
                }
            });
        },
        addGoodsType:function(data,callback,context){
        	$.ajax({
				url:"http://localhost/sapi/goodsType/add",
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
        getGoodsTypeInfoById: function(id, callback, context) {
            
        	$.ajax({
                url: "http://localhost/sapi/goodsType/"+id,
                type: "GET",
                success: function(data) {
                    callback.call(context || self, data);
                }
            });
        },
        updateGoodsType: function(id,contentData, callback, context) {
            var self = this;
            $.ajax({
                url: "http://localhost/sapi/goodsType/"+ id,
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