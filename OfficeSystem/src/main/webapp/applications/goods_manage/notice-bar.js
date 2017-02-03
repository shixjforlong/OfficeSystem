define(function(require){
	var cloud = require("cloud/base/cloud");
	require("cloud/lib/plugin/jquery-ui");
	require("cloud/resources/css/jquery-ui.css");
	require("cloud/lib/plugin/jquery.datetimepicker");
	require("cloud/resources/css/jquery.multiselect.css");
	var Button = require("cloud/components/button");
	var Service = require("./service");
    var NoticeBar = Class.create(cloud.Component, {
        initialize: function($super, options){
            $super(options);
			this._render();
        },
        _render: function(){
        	this.draw();
        	this._renderGoodsType();
        	this._renderBtn();
        },
        _renderGoodsType:function(){
			var self = this;
			self.searchData={
        			name:''
        	};
            Service.getAllGoodsType(self.searchData,1000,0,function(data){
            	$("#type").html("");
            	$("#type").append("<option value='-1'>所有商品分类</option>");
            	if(data.result && data.result.length>0){
            		for(var i=0;i<data.result.length;i++){
            			$("#type").append("<option value='" +data.result[i].id + "'>" +data.result[i].name+"</option>");
            		}
            	}
            });
		},
    	draw:function(){
    		  var self = this;
              var $htmls = $(+"<div></div>" +
              "<div id='search-bar' style='width:auto;margin-top:10px;margin-left:5px;'>" +
              "<label style='margin:auto 10px auto 10px ;margin-right: 6px;'>商品名称</label>" +
              "<input style='width:200px;' type='text'  id='name' />&nbsp;&nbsp;"  +
              "<label style='margin:auto 10px auto 10px ;margin-right: 6px;'>商品分类</label>" +
              "<select id='type'  name='type' style='width:100px;height: 28px; '>" +
              "</select>&nbsp;&nbsp;" +
              "<label style='margin:auto 10px auto 10px ;margin-right: 6px;'>售卖状态</label>" +
              "<select id='state'  name='state' style='width:100px;height: 28px; '>" +
              "<option value='-1'>所有售卖状态</option>" +
              "<option value='0'>售卖中</option>" +
              "<option value='1'>暂停售卖</option>" +
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
