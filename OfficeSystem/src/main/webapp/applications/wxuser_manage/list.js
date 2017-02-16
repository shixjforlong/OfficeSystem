define(function(require){
	require("cloud/base/cloud");
	require("cloud/base/fixTableHeader");
	var html = require("text!./list.html");
	var NoticeBar = require("./notice-bar");
	var Table = require("cloud/components/table");
	var Button = require("cloud/components/button");
	var Paging = require("cloud/components/paging");
	var Addwxuser = require("./wxuserMan-window");
	var Service = require("./service");
	var columns = [ {
		"title":"昵称",
		"dataIndex" : "nickName",
		"cls" : null,
		"width" : "20%"
	},{
		"title":"头像",
		"dataIndex" : "image",
		"cls" : null,
		"width" : "20%",
		render:function(data, type, row){
		    var productsImage = "product";
		    var  display = "";
		    if(data){
		    	var src = data;
                display += new Template(
                    "<img src='"+src+"' style='width: 50px;height: 50px;'/>")
                    .evaluate({
                        status : productsImage
                    });
		    }
         return display;
        }
	},{
		"title":"会员等级",
		"dataIndex" : "levelName",
		"cls" : null,
		"width" : "20%",
		render:function(data, type, row){
			var  display = "";
			if(data == 0 || data ==null){
				display = "非会员";
			}else{
				display = data;
			}
			return display;
		}
	},{
		"title":"经验值",
		"dataIndex" : "empirical",
		"cls" : null,
		"width" : "20%",
		render:function(data, type, row){
			var  display = "";
			if(data == 0 || data ==null){
				display = 0;
			}else{
				display = data;
			}
			return display;
		}
	},{
		"title":"积分",
		"dataIndex" : "integration",
		"cls" : null,
		"width" : "20%",
		render:function(data, type, row){
			var  display = "";
			if(data == 0 || data ==null){
				display = 0;
			}else{
				display = data;
			}
			return display;
		}
	}];
	var list = Class.create(cloud.Component,{
		initialize:function($super,options){
			$super(options);
	        this.element.html(html);
	        this.display = 30;
			this.pageDisplay = 30;
			this.elements = {
				bar : {
					id : "wxuser_list_bar",
					"class" : null
				},
				table : {
					id : "wxuser_list_table",
					"class" : null
				},
				paging : {
					id : "wxuser_list_paging",
					"class" : null
				}
			};
		    this._render();
		},
		_render:function(){
			$("#wxuser_list").css("width",$(".wrap").width());
			$("#wxuser_list_paging").css("width",$(".wrap").width());
			
			var headHeight = $(".navbar-header").height();
			$("#wxuser_list").css("height",$(window).height() -headHeight - $(".main_hd").height());
			
		    var listHeight = $("#wxuser_list").height();
	        var barHeight = $("#wxuser_list_bar").height()*2;
		    var tableHeight=listHeight - barHeight - 5;
		    $("#wxuser_list_table").css("height",tableHeight);
		    
		    this._renderNoticeBar();
			this._renderTable();
			
		},
		stripscript:function(s){ 
		    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？]") 
		    var rs = ""; 
		    for (var i = 0; i < s.length; i++) { 
		      rs = rs+s.substr(i, 1).replace(pattern, ''); 
		    } 
		    return rs; 
		},
		_renderTable : function() {
			this.listTable = new Table({
				selector : "#wxuser_list_table",
				columns : columns,
				datas : [],
				pageSize : 100,
				autoWidth : false,
				pageToolBar : false,
				checkbox : "full",
				events : {
					 onRowClick: function(data) {
						    this.listTable.unselectAllRows();
	                        var rows = this.listTable.getClickedRow();
	                        this.listTable.selectRows(rows);
	                   },
	                   onRowRendered: function(tr, data, index) {
	                        var self = this;
	                    },
	                   scope: this
				}
			});
		    var height = $("#wxuser_list_table").height()+"px";
	        $("#wxuser_list_table-table").freezeHeader({ 'height': height });
			this.setDataTable();
		},
		setDataTable : function() {
			this.loadTableData(30,0);
		},
		loadTableData : function(limit,cursor) {
			cloud.util.mask("#wxuser_list_table");
        	var self = this;
        	var name = $("#nickName").val();
        	if(name){
        		name = self.stripscript(name);
        	}
        	self.searchData={
        			nickName:name
        	};
            Service.getAllwxuser(self.searchData,limit,cursor,function(data){
            	console.log(data);
	   		    var total = data.result.length;
	   		    self.pageRecordTotal = total;
	   	        self.totalCount = data.result.length;
	            self.listTable.render(data.result);
	   	        self._renderpage(data, 1);
	   	        cloud.util.unmask("#wxuser_list_table");
   			}, self);
			
		},
		 _renderpage:function(data, start){
			 var self = this;
			 if(self.page){
				 self.page.reset(data);
			 }else{
				 self.page = new Paging({
        			selector : $("#wxuser_list_paging"),
        			data:data,
    				current:1,
    				total:data.total,
    				limit:this.pageDisplay,
        			requestData:function(options,callback){
        				cloud.util.mask("#wxuser_list_table");
        				Service.getAllwxuser(self.searchData, options.limit,options.cursor,function(data){
        				   self.pageRecordTotal = data.total - data.cursor;
						   callback(data);
						   cloud.util.unmask("#wxuser_list_table");
        				});
        			},
        			turn:function(data, nowPage){
        			    self.totalCount = data.result.length;
        			    self.listTable.clearTableData();
        			    self.listTable.render(data.result);
        				self.nowPage = parseInt(nowPage);
        			},
        			events : {
        			    "displayChanged" : function(display){
        			        self.display = parseInt(display);
        			    }
        			}
        		});
        		this.nowPage = start;
        	}
        }, 
        _renderNoticeBar:function(){
			var self = this;
			this.noticeBar = new NoticeBar({
				selector : "#wxuser_list_bar",
				events : {
					  query: function(){
						  self.loadTableData($(".paging-limit-select").val(),0);
					  },
					  modify:function(){
						    var selectedResouces = self.getSelectedResources();
	                        if (selectedResouces.length == 0) {
	                            dialog.render({lang: "please_select_at_least_one_config_item"});
	                        } else if (selectedResouces.length >= 2) {
	                            dialog.render({lang: "select_one_gateway"});
	                        } else {
	                        	var _id = selectedResouces[0].id;
	                        	if (this.modifyPro) {
	                                this.modifyPro.destroy();
	                            }
	                            this.modifyPro = new Addwxuser({
	                                selector: "body",
	                                id: _id,
	                                events: {
	                                    "getwxuserList": function() {
	                                    	self.loadTableData($(".paging-limit-select").val(),0);
	                                    }
	                                }
	                            });
	                        }
					  }
				}
			});
		},
		getSelectedResources: function() {
            var self = this;
            var rows = self.listTable.getSelectedRows();
            var selectedRes = new Array();
            rows.each(function(row) {
                selectedRes.push(self.listTable.getData(row));
            });
            return selectedRes;
        }  
	});
	return list;
});