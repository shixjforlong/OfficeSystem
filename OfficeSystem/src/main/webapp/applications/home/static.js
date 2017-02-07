define(function(require){
	require("cloud/base/cloud");
	require("cloud/base/fixTableHeader");
	require("cloud/components/chart");
	var html = require("text!./static.html");
	var statics = Class.create(cloud.Component,{
		initialize:function($super,options){
			$super(options);
	        this.element.html(html);
	        $("#homeContent").css("width",$(".wrap").width());
		    this._render();
		},
		_render:function(){
			this.renderChart();
		},
		renderChart:function(){
			var newTimes = ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
			var money="收入";
			var moneyData=[0, 0, 0, 0, 0, 0, 0, 0, 0, 1.5, 0, 2.5, 2.5, 5, 2.5, 5, 0.5, 5, 0, 0, 0, 0, 0, 0];
        	var count="销量";
        	var countData=[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 2, 1, 2, 1, 2, 0, 0, 0, 0, 0, 0];
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