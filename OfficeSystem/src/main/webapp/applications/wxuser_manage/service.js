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
                	$.ajax({
                        url: "/sapi/vip/list?limit=100000&cursor=0",
                        type: "GET",
                        success: function(vip) {
                        	if(vip.result&&vip.result.length>0){
                        		if(data.result&&data.result.length>0){
                        			for(var i=0;i<data.result.length;i++){
                        				for(var j=0;j<vip.result.length;j++){
                                			var empiricalU = vip.result[j].empiricalU;
                                			var empiricalL = vip.result[j].empiricalL;
                                			if(data.result[i].empirical){
                                				if(empiricalU<data.result[i].empirical && data.result[i].empirical<empiricalL){
                                    				data.result[i].levelName = vip.result[j].levelName;
                                    				data.result[i].levelId = vip.result[j].id;
                                    			}
                                			}
                                		}
                            		}
                        		}
                        	}
                        	callback.call(context || self, data);
                        }
                	});
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