define(function(require){
	var cloud = require("cloud/base/cloud");
	require("cloud/lib/plugin/jquery-ui");
	require("cloud/resources/css/jquery-ui.css");
	require("cloud/lib/plugin/jquery.datetimepicker");
	require("cloud/resources/css/jquery.multiselect.css");
	var Button = require("cloud/components/button");
    var NoticeBar = Class.create(cloud.Component, {
        initialize: function($super, options){
            $super(options);
			this._render();
        },
        _render: function(){
        	this.draw();
        	this._renderBtn();
        },
    	draw:function(){
    		  var self = this;
              var $htmls = $(+"<div></div>" +
              "<div id='search-bar' style='width:auto;margin-top:10px;margin-left:5px;'>" +
              "<label style='margin:auto 10px auto 10px ;margin-right: 6px;'>订单编号</label>" +
              "<input style='width:200px;height:28px;' type='text'  id='orderNo' />&nbsp;&nbsp;"  +
              "<label style='margin:auto 10px auto 10px ;margin-right: 6px;'>订单状态</label>" +
              "<select id='state' style='height: 28px; border-radius: 4px;width:120px;'>" +
                 "<option value='-2' selected='selected'>所有</option>" +
                 "<option value='-1'>未支付</option>" +
                 "<option value='0'>等待接单</option>" +
                 "<option value='1'>已接单</option>" +
                 "<option value='2'>配送中</option>" +
                 "<option value='3'>已完成</option>" +
                 "<option value='4'>订单取消</option>" +
              "</select>&nbsp;&nbsp;" +
              "</div>");
              this.element.append($htmls);
		},
        _renderBtn: function(){
            var self = this;
            //查询
            var queryBtn = new Button({
                text: "查询",
                container: $("#search-bar"),
                events: {
                    click: function(){
                        self.fire("query");
                    }
                }
            });
            $("#"+queryBtn.id).addClass("readClass");
            
            var seeBtn = new Button({
                text: "查看详情",
                container: $("#search-bar"),
                events: {
                    click: function(){
                        self.fire("see");
                    }
                }
            });
            
            $("#search-bar a").css({
                margin: "-3px 0px 0px 6px"
            });
        }
    });
    return NoticeBar;
});
