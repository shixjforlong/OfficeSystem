define(function(require) {
    require("cloud/base/cloud");
    var Service = Class.create({
        initialize: function(){
        },
       
        deleteGoodsTypeById: function(id, callback, context) {
        	$.ajax({
                url: "/sapi/goodsType/" + id,
                type: "DELETE",
                success: function(data) {
                    callback.call(context || this, data);
                }
            });
        },
        getAllGoodsType: function(searchData, limit, cursor, callback, context) {
            var self = this;
            var url="/sapi/goodsType/list?limit="+limit+"&cursor="+cursor;
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
        addGoodsType:function(data,callback,context){
        	$.ajax({
				url:"/sapi/goodsType/add",
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
                url: "/sapi/goodsType/"+id,
                type: "GET",
                success: function(data) {
                    callback.call(context || self, data);
                }
            });
        },
        updateGoodsType: function(id,contentData, callback, context) {
            var self = this;
            $.ajax({
                url: "/sapi/goodsType/"+ id,
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