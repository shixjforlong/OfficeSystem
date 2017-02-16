define(function(require){
	require("cloud/base/cloud");
	require("cloud/base/fixTableHeader");
	var html = require("text!./list.html");
	var NoticeBar = require("./notice-bar");
	var Table = require("cloud/components/table");
	var Button = require("cloud/components/button");
	var Paging = require("cloud/components/paging");
	var Service = require("./service");
	var SeeOrderDetail = require("./seeOrderDetail-window");
	var columns = [ {
		"title":"订单编号",
		"dataIndex" : "orderNo",
		"cls" : null,
		"width" : "12%"
	},{
		"title":"订单状态",
		"dataIndex" : "state",
		"cls" : null,
		"width" : "10%",
		render: stateConvertor
	},{
		"title":"商品",
		"dataIndex" : "goodsInfo",
		"cls" : null,
		"width" : "20%",
		render: function(data, type, row) {
			 var display = "";
	    	 var array = data.split(";");
	    	 if(array.length>0){
	    		 display += new Template(
	    	             "<table  border='1px' style='border-color: gainsboro;'>"
	    			     )
	    	             .evaluate({
	    	                 status : ''
	    	             });
	    		 for(var i=0;i<array.length-1;i++){
	    	    	 var tds = array[i].split(",");
	    	    	 display += new Template(
	   	    			       "<tr style='border-bottom:0px;border-top:0px;'><td width='40%'>"+tds[0]+"</td><td width='30%'>"+tds[1]+"份</td><td width='30%'>"+tds[2]+"元</td></tr>"
	   	    			     )
	   	    	             .evaluate({
	   	    	                 status : ''
	   	    	     });
	    	     }
	    		 display += new Template("</table>")
 	    	             .evaluate({
 	    	                 status : ''
 	    	     });
	    	 }
	    	 return display;
		}
	},{
		"title":"金额",
		"dataIndex" : "payPrice",
		"cls" : null,
		"width" : "8%"
	},{
		"title":"收货地址",
		"dataIndex" : "receiveAddress",
		"cls" : null,
		"width" : "10%"
	},{
		"title":"收货人",
		"dataIndex" : "receiveName",
		"cls" : null,
		"width" : "10%"
	},{
		"title":"手机号",
		"dataIndex" : "receivePhone",
		"cls" : null,
		"width" : "10%"
	}
	,{
		"title":"接单时间",
		"dataIndex" : "orderInTime",
		"cls" : null,
		"width" : "10%",
		render:function(data, type, row){
			if(data){
				return cloud.util.dateFormat(new Date(data), "yyyy-MM-dd hh:mm:ss");
			}
			
		}
	},{
		"title":"配送时间",
		"dataIndex" : "orderOutTime",
		"cls" : null,
		"width" : "10%",
		render:function(data, type, row){
			if(data){
				return cloud.util.dateFormat(new Date(data), "yyyy-MM-dd hh:mm:ss");
			}
			
		}
	}];
	function stateConvertor(value, type) {//-1:订单暂未支付  0:等待商户接单  1:商户已接单  2:商品派送中  3:订单完成 4:订单取消
        var display = "";
        if ("display" == type) {
            switch (value) {
                case "-1":
                    display = "未支付";
                    break;
                case "0":
                	display += new Template(
      	    	             "<span style='color:red;'>等待接单</span>"
      	    			     )
      	    	             .evaluate({
      	    	                 status : ''
      	    	             });
                    break;
                case "1":
                	display += new Template(
     	    	             "<span style='color:green;'>已接单</span><br>"+
     	    	             "<span style='color:red;'>等待配送</span>"
     	    			     )
     	    	             .evaluate({
     	    	                 status : ''
     	    	             });
                    break;
                case "2":
                	display += new Template(
    	    	             "<span style='color:green;'>已配送</span><br>"+
    	    	             "<span style='color:red;'>等待收货</span>"
    	    			     )
    	    	             .evaluate({
    	    	                 status : ''
    	    	             });
                    break;
                case "3":
                	display += new Template(
   	    	             "<span style='color:green;'>订单完成</span>"
   	    			     )
   	    	             .evaluate({
   	    	                 status : ''
   	    	             });
                    break;
                case "4":
                	display += new Template(
   	    	             "<span style='color:red;'>订单取消</span>"
   	    			     )
   	    	             .evaluate({
   	    	                 status : ''
   	    	             });
                    break;
                default:
                    break;
            }
            return display;
        } else {
            return value;
        }
    }
	var list = Class.create(cloud.Component,{
		initialize:function($super,options){
			$super(options);
	        this.element.html(html);
	        this.display = 30;
			this.pageDisplay = 30;
			this.state = options.state;
			this.cancelState = options.cancelState;
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
			this.loadTableData(30,0);
		},
		loadTableData : function(limit,cursor) {
			cloud.util.mask("#torder_list_table");
        	var self = this;
        	var orderNo = $("#orderNo").val();
        	var number = window.sessionStorage.getItem("number");
        	if(number =="0"){
        		number="";
        	}
        	self.searchData={
        			orderNo:orderNo,
        			state:self.state,
        			number:number,
        			cancelState:self.cancelState
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
				state:self.state,
				cancelState:self.cancelState,
				events : {
					  query: function(){
						  self.loadTableData($(".paging-limit-select").val(),0);
					  },
					  see: function(){
						    var selectedResouces = self.getSelectedResources();
	                        if (selectedResouces.length == 0) {
	                            dialog.render({text: "请选择一个订单"});
	                        } else if (selectedResouces.length >= 2) {
	                            dialog.render({text: "一次只能查看一个订单"});
	                        } else {
	                            var id = selectedResouces[0].id;
	                            if (this.seeOrder) {
	                                this.seeOrder.destroy();
	                            }
	                            this.seeOrder = new SeeOrderDetail({
	                                selector: "body",
	                                orderId: id
	                            });
	                        }
					  },
					  updateState1:function(state){//1:商户已接单  
						    var selectedResouces = self.getSelectedResources();
	                        if (selectedResouces.length == 0) {
	                            dialog.render({text: "请选择一个订单"});
	                        } else if (selectedResouces.length >= 2) {
	                            dialog.render({text: "一次只能修改一个订单"});
	                        } else {
	                        	 var id = selectedResouces[0].id;
	                        	 var finalData={
	                        			 state:state
	                        	 };
	                        	 Service.updateOrderById(id,finalData, function(data) {
	                        		 console.log(data);
	                        		 self.loadTableData($(".paging-limit-select").val(),0);
	                        	 });
	                        }
					  },
					  updateState2:function(state){//  2:商品派送中 
						    var selectedResouces = self.getSelectedResources();
	                        if (selectedResouces.length == 0) {
	                            dialog.render({text: "请选择一个订单"});
	                        } else if (selectedResouces.length >= 2) {
	                            dialog.render({text: "一次只能修改一个订单"});
	                        } else {
	                        	 var id = selectedResouces[0].id;
	                        	 var finalData={
	                        			 state:state
	                        	 };
	                        	 Service.updateOrderById(id,finalData, function(data) {
	                        		 console.log(data);
	                        		 self.loadTableData($(".paging-limit-select").val(),0);
	                        	 });
	                        }
					  },
					  updateState3:function(state){//   3:订单完成
						    var selectedResouces = self.getSelectedResources();
	                        if (selectedResouces.length == 0) {
	                            dialog.render({text: "请选择一个订单"});
	                        } else if (selectedResouces.length >= 2) {
	                            dialog.render({text: "一次只能修改一个订单"});
	                        } else {
	                        	 var id = selectedResouces[0].id;
	                        	 var finalData={
	                        			 state:state
	                        	 };
	                        	 Service.updateOrderById(id,finalData, function(data) {
	                        		 console.log(data);
	                        		 self.loadTableData($(".paging-limit-select").val(),0);
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