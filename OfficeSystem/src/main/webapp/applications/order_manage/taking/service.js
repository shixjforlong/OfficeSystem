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
            if(searchData.state){
            	url = url+"&state="+searchData.state;
            }
            if(searchData.number){
            	url = url+"&number="+searchData.number;
            }
            $.ajax({
                url: url,
                type: "GET",
                success: function(data) {
                    callback.call(context || self, data);
                }
            });
        },
       
        updateOrderById: function(id,contentData, callback, context) {
            var self = this;
            $.ajax({
                url: "/wapi/order/"+ id,
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
        getOrderInfoById: function(id, callback, context) {
            
        	$.ajax({
                url: "/wapi/order/"+ id,
                type: "GET",
                success: function(data) {
                    callback.call(context || self, data);
                }
            });
        },
    });

    return new Service();
    
});