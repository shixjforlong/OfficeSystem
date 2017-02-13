define(function(require) {
    require("cloud/base/cloud");
    var Service = Class.create({
        initialize: function(){
        },
       
        getOrderDay: function(startTime,endTime, cursor,limit, callback, context) {
            var self = this;
            var url="/wapi/statistics/day?limit="+limit+"&cursor="+cursor+"&startTime="+startTime+"&endTime="+endTime;
            $.ajax({
                url: url,
                type: "GET",
                success: function(data) {
                    callback.call(context || self, data);
                }
            });
        },
        getOrderMonth: function(startTime,endTime, cursor,limit, callback, context) {
            var self = this;
            var url="/wapi/statistics/month?limit="+limit+"&cursor="+cursor+"&startTime="+startTime+"&endTime="+endTime;
            $.ajax({
                url: url,
                type: "GET",
                success: function(data) {
                    callback.call(context || self, data);
                }
            });
        },
        getOrderYear: function(startTime,endTime, cursor,limit, callback, context) {
            var self = this;
            var url="/wapi/statistics/year?limit="+limit+"&cursor="+cursor+"&startTime="+startTime+"&endTime="+endTime;
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