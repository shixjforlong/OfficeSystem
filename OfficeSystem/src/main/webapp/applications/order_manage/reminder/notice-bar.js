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
            this.state = options.state;
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
              "<input style='width:200px;height:28px;' type='text'  id='orderNo' />"  +
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
            
            var seeBtn = new Button({
                text: "查看详情",
                container: $("#search-bar"),
                events: {
                    click: function(){
                        self.fire("see");
                    }
                }
            });
          
            var take1Btn = new Button({
                text: "回复催单",
                container: $("#search-bar"),
                events: {
                    click: function(){
                    	self.fire("updateState1",1);
                    }
                }
            });
            $("#"+take1Btn.id).addClass("readClass");
            
            
            $("#search-bar a").css({
                margin: "-3px 0px 0px 6px"
            });
        }
    });
    return NoticeBar;
});
