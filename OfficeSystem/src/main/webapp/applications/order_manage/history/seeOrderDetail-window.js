define(function(require){
	var cloud = require("cloud/base/cloud");
	var _Window = require("cloud/components/window");
	require("cloud/lib/plugin/jquery.uploadify");
	var Service = require("./service");
	var winHtml = require("text!./seeOrderDetail.html");
	require("cloud/lib/plugin/jquery.uploadify");
	
	var Window = Class.create(cloud.Component,{
		initialize:function($super,options){
			$super(options);
			this.orderId = options.orderId;
			this._renderWindow();
			locale.render({element:this.element});
		},
		_renderWindow:function(){
			this.window = new _Window({
				container: "body",
				title: "订单详情",
				top: "center",
				left: "center",
				height:650,
				width: 900,
				mask: true,
				drag:true,
				content:winHtml,
				events: {
					"onClose": function() {
							this.window.destroy();
							cloud.util.unmask();
					},
					scope: this
				}
			});
			this.window.show();	
		    this.renderGetData();
		},
		renderGetData:function (){
			Service.getOrderInfoById(this.orderId,function(data){
				console.log(data);
				$("#orderNos").text(data.result.orderNo==null?"":data.result.orderNo);
				$("#tradeNo").text(data.result.tradeNo==null?"":data.result.tradeNo);
				if(data.result.state =="-1"){
					$("#states").text("未支付");
				}else if(data.result.state =="0"){
					$("#states").text("等待接单");
				}else if(data.result.state =="1"){
					$("#states").text("已接单，等待配送");
				}else if(data.result.state =="2"){
					$("#states").text("已配送，等待收货");
				}else if(data.result.state =="3"){
					$("#states").text("已完成");
				}else if(data.result.state =="4"){
					$("#states").text("订单取消");
				}
				$("#gtotalPrice").text(data.result.gtotalPrice==null?"":data.result.gtotalPrice);
				$("#integral").text(data.result.integral==null?"":data.result.integral);
				$("#distributionCosts").text(data.result.distributionCost==null?"":data.result.distributionCost);
				$("#payPrice").text(data.result.payPrice==null?"":data.result.payPrice);
				$("#getIntegral").text(data.result.getIntegral==null?"":data.result.getIntegral);
				$("#empirical").text(data.result.empirical==null?"":data.result.empirical);
				$("#receiveName").text(data.result.receiveName==null?"":data.result.receiveName);
				$("#receiveGender").text(data.result.receiveGender==null?"":data.result.receiveGender);
				$("#receivePhone").text(data.result.receivePhone==null?"":data.result.receivePhone);
				$("#receiveAddress").text(data.result.receiveAddress==null?"":data.result.receiveAddress);
				if(data.result.refundStatus == 1){
					$("#refundStatus").text("正在退款");
				}else if(data.result.refundStatus == 2){
					$("#refundStatus").text("退款成功");
				}else{
					$("#refundStatus").text("无");
				}
				$("#payTime").text(data.result.payTime==null?"":cloud.util.dateFormat(new Date(data.result.payTime), "yyyy-MM-dd hh:mm:ss"));
				$("#orderInTime").text(data.result.orderInTime==null?"未接单":cloud.util.dateFormat(new Date(data.result.orderInTime), "yyyy-MM-dd hh:mm:ss"));
				$("#orderOutTime").text(data.result.orderOutTime==null?"未配送":cloud.util.dateFormat(new Date(data.result.orderOutTime), "yyyy-MM-dd hh:mm:ss"));
				$("#orderFinishTime").text(data.result.orderFinishTime==null?"未完成":cloud.util.dateFormat(new Date(data.result.orderFinishTime), "yyyy-MM-dd hh:mm:ss"));
			    if(data.result.goodsInfo){
			    	var array = data.result.goodsInfo.split(";");
			    	if(array.length>0){
			    		for(var i=0;i<array.length-1;i++){
			    			var tds = array[i].split(",");
			    			$("#goodsInfo").append(
			    			   "<tr style='border-bottom:0px;border-top:0px;'><td width='40%'>"+tds[0]+"</td><td width='30%'>"+tds[1]+"份</td><td width='30%'>"+tds[2]+"元</td></tr>"
			    			);
			    		}
			    	}
			    }
			});
		},
		destroy:function(){
			if(this.window){
				this.window.destroy();
			}else{
				this.window = null;
			}
		}
	});
	return Window;
});