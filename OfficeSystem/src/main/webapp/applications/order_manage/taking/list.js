define(function(require){
	require("cloud/base/cloud");
	require("cloud/base/fixTableHeader");
	var html = require("text!./list.html");
	var NoticeBar = require("./notice-bar");
	var Table = require("cloud/components/table");
	var Button = require("cloud/components/button");
	var Paging = require("cloud/components/paging");
	var Service = require("./service");
	var columns = [ {
		"title":"订单编号",
		"dataIndex" : "name",
		"cls" : null,
		"width" : "10%"
	},{
		"title":"订单状态",
		"dataIndex" : "descript",
		"cls" : null,
		"width" : "10%"
	},{
		"title":"商品名称",
		"dataIndex" : "descript",
		"cls" : null,
		"width" : "20%"
	},{
		"title":"支付金额",
		"dataIndex" : "descript",
		"cls" : null,
		"width" : "10%"
	},{
		"title":"收货地址",
		"dataIndex" : "descript",
		"cls" : null,
		"width" : "20%"
	},{
		"title":"收货人姓名",
		"dataIndex" : "descript",
		"cls" : null,
		"width" : "10%"
	},{
		"title":"收货人手机号",
		"dataIndex" : "descript",
		"cls" : null,
		"width" : "10%"
	},{
		"title":"订单创建时间",
		"dataIndex" : "descript",
		"cls" : null,
		"width" : "10%"
	}];
	var list = Class.create(cloud.Component,{
		initialize:function($super,options){
			$super(options);
	        this.element.html(html);
	        this.display = 30;
			this.pageDisplay = 30;
			this.elements = {
				bar : {
					id : "torder_list_bar",
					"class" : null
				},
				table : {
					id : "torder_list_table",
					"class" : null
				},
				paging : {
					id : "torder_list_paging",
					"class" : null
				}
			};
		    this._render();
		},
		_render:function(){
			$("#torder_list").css("width",$(".wrap").width());
			$("#torder_list_paging").css("width",$(".wrap").width());
			var headHeight = $(".navbar-header").height();
			$("#torder_list").css("height",$(window).height() -headHeight - $(".main_hd").height());
			
		    var listHeight = $("#torder_list").height();
	        var barHeight = $("#torder_list_bar").height()*2;
		    var tableHeight=listHeight - barHeight - 5;
		    $("#torder_list_table").css("height",tableHeight);
		    
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
				selector : "#torder_list_table",
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
		    var height = $("#torder_list_table").height()+"px";
	        $("#torder_list_table-table").freezeHeader({ 'height': height });
			this.setDataTable();
		},
		setDataTable : function() {
			//this.loadTableData(30,0);
		},
		loadTableData : function(limit,cursor) {
			cloud.util.mask("#torder_list_table");
        	var self = this;
        	var name = $("#name").val();
        	if(name){
        		name = self.stripscript(name);
        	}
        	self.searchData={
        			name:name
        	};
            Service.getAlltorder(self.searchData,limit,cursor,function(data){
            	console.log(data);
	   		    var total = data.result.length;
	   		    self.pageRecordTotal = total;
	   	        self.totalCount = data.result.length;
	            self.listTable.render(data.result);
	   	        self._renderpage(data, 1);
	   	        cloud.util.unmask("#torder_list_table");
   			}, self);
			
		},
		 _renderpage:function(data, start){
			 var self = this;
			 if(self.page){
				 self.page.reset(data);
			 }else{
				 self.page = new Paging({
        			selector : $("#torder_list_paging"),
        			data:data,
    				current:1,
    				total:data.total,
    				limit:this.pageDisplay,
        			requestData:function(options,callback){
        				cloud.util.mask("#torder_list_table");
        				Service.getAlltorder(self.searchData, options.limit,options.cursor,function(data){
        				   self.pageRecordTotal = data.total - data.cursor;
						   callback(data);
						   cloud.util.unmask("#torder_list_table");
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
				selector : "#torder_list_bar",
				events : {
					  query: function(){
						  self.loadTableData($(".paging-limit-select").val(),0);
					  },
					  updateState:function(){
						    var selectedResouces = self.getSelectedResources();
	                        if (selectedResouces.length == 0) {
	                            dialog.render({lang: "please_select_at_least_one_config_item"});
	                        } else if (selectedResouces.length >= 2) {
	                            dialog.render({lang: "select_one_gateway"});
	                        } else {
	                        	var _id = selectedResouces[0].id;
	                        	
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