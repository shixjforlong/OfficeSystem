define(function(require){
	require("cloud/base/cloud");
	require("cloud/base/fixTableHeader");
	require("cloud/components/chart");
	var html = require("text!./static.html");
	var service = require("./service");
	var NoticeBar=require("./notice-bar");
	var statics = Class.create(cloud.Component,{
		initialize:function($super,options){
			$super(options);
	        this.element.html(html);
	        $("#homeContent").css("height",$("#user-content").height());
	        $("#homeContent").css("width",$(".wrap").width());
		    this._render();
		},
		_render:function(){
			this.loadData();
			this.renderChart();
			this._renderNoticeBar();
		},
		loadData: function() {
            var myDate = new Date();
            var full = myDate.getFullYear();
            var month = myDate.getMonth() + 1;
            var day = myDate.getDate();
            var date = full + "/" + month + "/" + day;
            var startTime = (new Date(date + " 00:00:00")).getTime() / 1000;
            var endTime = (new Date(date + " 23:59:59")).getTime() / 1000;

            this.getEveryDay(startTime, endTime, null);
        },
		getEveryDay:function(startTime, endTime){
			var self = this;
			service.getOrderDay(startTime,endTime,0,10000,function(data){
				console.log(data);
				if(data[0].priceT){
					$("#price").text(data[0].priceT);
				}else{
					$("#price").text("0");
				}
				if(data[0].countT){
					$("#count").text(data[0].countT);
				}else{
					$("#count").text("0");
				}
				var newTimes = ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
				self.renderChart(data[0].price,data[0].count,newTimes);
				
				$("#lineTitle").text("每小时销售统计图");
			});
		},
		getEveryMonth:function(startTime, endTime){
			var self = this;
			service.getOrderMonth(startTime,endTime,0,10000,function(data){
				console.log(data);
				if(data[0].priceT){
					$("#price").text(data[0].priceT);
				}else{
					$("#price").text("0");
				}
				if(data[0].countT){
					$("#count").text(data[0].countT);
				}else{
					$("#count").text("0");
				}
				var byMonth = $("#summary_month").val();
                var months = byMonth.split('/')[1];
                var year = byMonth.split('/')[0];

            	var  maxday = new Date(year,months,0).getDate();
                var newTimes = [];
                if (months == 1 || months == 3 || months == 5 || months == 7 || months == 8 || months == 10 || months == 12) {
                    newTimes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
                } else if (months == 2) {
                	
                    newTimes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28"];
                    if(maxday > 28){
                    	newTimes[28] = "29";
                    }
                } else {
                    newTimes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"];
                }
				self.renderChart(data[0].price,data[0].count,newTimes);
				$("#lineTitle").text("每日销售统计图");
			});
		},
		getEveryYear:function(startTime, endTime){
			var self = this;
			service.getOrderYear(startTime,endTime,0,10000,function(data){
				console.log(data);
				if(data[0].priceT){
					$("#price").text(data[0].priceT);
				}else{
					$("#price").text("0");
				}
				if(data[0].countT){
					$("#count").text(data[0].countT);
				}else{
					$("#count").text("0");
				}
			    var newTimes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
				self.renderChart(data[0].price,data[0].count,newTimes);
				$("#lineTitle").text("每月销售统计图");
			});
		},
		 _renderNoticeBar:function(){ 
        	 var self=this;
        	 var noticeBar = new NoticeBar({
        		 selector: $("#statistics_bar"),
        		 events:{
        			 query: function(){
                         self.executeSearch(function(startTime, endTime) {
                             var selectedId = $("#reportType").find("option:selected").val();
                             if (selectedId == "1") {
                                  self.getEveryDay(startTime, endTime);
                             } else if (selectedId == "2") {
                                  self.getEveryMonth(startTime, endTime);
                             } else if (selectedId == "3") {
                                  self.getEveryYear(startTime, endTime);
                             }
                         });
                     
        			 }
        		 	}
				});
		},
		executeSearch: function(callback) {
        	var self=this;
            var byDate = "";
            var byMonth = "";
            var byYear = "";
            var startTime = '';
            var endTime = '';
            var selectedId = $("#reportType").find("option:selected").val();
            if (selectedId == "1") {
                byDate = $("#summary_date").val();//日
            } else if (selectedId == "2") {
                byMonth = $("#summary_month").val();//月
            } else if (selectedId == "3") {
                byYear = $("#summary_year").val();//年
            } 
           
            //日报表
            if (byDate) {
                startTime = (new Date(byDate + " 00:00:00")).getTime() / 1000;
                endTime = (new Date(byDate + " 23:59:59")).getTime() / 1000;
            }
           
            //月报表
            if (byMonth) {
            	var year = byMonth.split('/')[0];
            	
                var months = byMonth.split('/')[1];
            	var  maxday = new Date(year,months,0).getDate();
            	
                if (months == 1 || months == 3 || months == 5 || months == 7 || months == 8 || months == 10 || months == 12) {
                    startTime = (new Date(byMonth + "/01" + " 00:00:00")).getTime() / 1000;
                    endTime = (new Date(byMonth + "/31" + " 23:59:59")).getTime() / 1000;
                } else if (months == 2) {
                    startTime = (new Date(byMonth + "/01" + " 00:00:00")).getTime() / 1000;
                    endTime = (new Date(byMonth + "/" +maxday+ " 23:59:59")).getTime() / 1000;
                } else {
                    startTime = (new Date(byMonth + "/01" + " 00:00:00")).getTime() / 1000;
                    endTime = (new Date(byMonth + "/30" + " 23:59:59")).getTime() / 1000;
                }
            }
            //年报表
            if (byYear) {
                startTime = (new Date(byYear + "/01/01" + " 00:00:00")).getTime() / 1000;
                endTime = (new Date(byYear + "/12/31" + " 23:59:59")).getTime() / 1000;
            }

            callback(startTime, endTime);

        },
		renderChart:function(moneyData,countData,newTimes){
			var money="收入";
        	var count="订单数";
			$('#flot-1ine').highcharts({
                chart: {
                    type: 'line',
                    height: 200,
                    width: $("#flot-1ine").width()
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: newTimes
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    min: 0
                },
                tooltip: {
                    shared: true
                },
                series: 
                	//result
                	[{
                    	name: money,
                        color: '#24CBE5',
                        type: 'spline',
                        data: moneyData,
                        tooltip: {
                            valueSuffix: locale.get({lang:"china_yuan"})
                        }

                    }, {
                    	name: count,
                        color: '#458B00',
                        type: 'spline',
                        data: countData,
                        tooltip: {
                            valueSuffix: locale.get({lang:"ren"})
                        }
                    }]   
            });
		}
			
	});
	return statics;
});