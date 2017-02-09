define(function(require) {
    require("cloud/base/cloud");
    var Service = Class.create({
        initialize: function(){
        },
       
        getAlltorder: function(searchData, limit, cursor, callback, context) {
            var self = this;
            var url="/wapi/order/list?limit="+limit+"&cursor="+cursor;
            if(searchData.orderNo){
            	url = url+"&orderNo="+searchData.orderNo;
            }
            $.ajax({
                url: url,
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