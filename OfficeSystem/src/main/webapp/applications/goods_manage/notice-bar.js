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
              "<label style='margin:auto 10px auto 10px ;margin-right: 6px;'>商品名称</label>" +
              "<input style='width:200px;' type='text'  id='name' />"  +
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
            
          
            var addBtn = new Button({
                text: "添加",
                container: $("#search-bar"),
                events: {
                    click: function(){
                    	self.fire("add");
                    }
                }
            });
            var editBtn = new Button({
                text: "修改",
                container: $("#search-bar"),
                events: {
                    click: function(){
                    	self.fire("modify");
                    }
                }
            });
            var deleteBtn = new Button({
                text: "删除",
                container: $("#search-bar"),
                events: {
                    click: function(){
                    	self.fire("drop");
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
