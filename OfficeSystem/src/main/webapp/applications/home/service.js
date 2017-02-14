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
        getOrderDay: function(startTime,endTime, number,cursor,limit, callback, context) {
            var self = this;
            var url="/wapi/statistics/day?limit="+limit+"&cursor="+cursor+"&startTime="+startTime+"&endTime="+endTime;
            if(number){
            	url = url+"&number="+number;
            }
            $.ajax({
                url: url,
                type: "GET",
                success: function(data) {
                    callback.call(context || self, data);
                }
            });
        },
        getOrderMonth: function(startTime,endTime,number, cursor,limit, callback, context) {
            var self = this;
            var url="/wapi/statistics/month?limit="+limit+"&cursor="+cursor+"&startTime="+startTime+"&endTime="+endTime;
            if(number){
            	url = url+"&number="+number;
            }
            $.ajax({
                url: url,
                type: "GET",
                success: function(data) {
                    callback.call(context || self, data);
                }
            });
        },
        getOrderYear: function(startTime,endTime,number, cursor,limit, callback, context) {
            var self = this;
            var url="/wapi/statistics/year?limit="+limit+"&cursor="+cursor+"&startTime="+startTime+"&endTime="+endTime;
            if(number){
            	url = url+"&number="+number;
            }
            $.ajax({
                url: url,
                type: "GET",
                success: function(data) {
                    callback.call(context || self, data);
                }
            });
        }
        
    });

    return new Service();
    
});