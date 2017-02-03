define(function(require){
	require("cloud/base/cloud");
	require("cloud/base/fixTableHeader");
	var html = require("text!./list.html");
	var NoticeBar = require("./notice-bar");
	var Table = require("cloud/components/table");
	var Button = require("cloud/components/button");
	var Paging = require("cloud/components/paging");
	var Addgoods = require("./goodsMan-window");
	var Service = require("./service");
	var columns = [ {
		"title":"商品名称",
		"dataIndex" : "name",
		"cls" : null,
		"width" : "10%"
	},{
		"title":"图片",
		"dataIndex" : "imageName",
		"cls" : null,
		"width" : "10%",
		 render:function(data, type, row){
			    var productsImage = "product";
			    var  display = "";
			    if(data){
			    	var src = "http://101.201.150.141/file/"+data;
	                display += new Template(
	                    "<img src='"+src+"' style='width: 50px;height: 50px;'/>")
	                    .evaluate({
	                        status : productsImage
	                    });
			    }
             return display;
         }
	},{
		"title":"商品分类",
		"dataIndex" : "typeName",
		"cls" : null,
		"width" : "10%"
	},{
		"title":"价格(元)",
		"dataIndex" : "price",
		"cls" : null,
		"width" : "10%",
		render: priceConvertor
	},{
		"title":"规格",
		"dataIndex" : "specifications",
		"cls" : null,
		"width" : "40%",
		 render: function(data, type, row) {
	    	    var display = "";
	    	    var array = data.split(";");
	    	    if(array.length>0){
	    	    	display += new Template(
		    	             "<table  border='1px' style='border-color: gainsboro;'>"+
		    			       "<tr style='border-bottom:0px;border-top:0px;'><td width='25%'>商品名称</td><td width='25%'>价格</td><td width='25%'>餐盒价格</td><td width='25%'>餐盒数量</td></tr>"
		    			     )
		    	             .evaluate({
		    	                 status : ''
		    	             });
	    	    	for(var i=0;i<array.length-1;i++){
	    	    	    var tds = array[i].split(",");
	    	    		display += new Template(
	   	    			       "<tr style='border-bottom:0px;border-top:0px;'><td width='25%'>"+tds[0]+"</td><td width='25%'>"+tds[1]+"</td><td width='25%'>"+tds[2]+"</td><td width='25%'>"+tds[3]+"</td></tr>"+
	   	    			     "</table>")
	   	    	             .evaluate({
	   	    	                 status : ''
	   	    	             });
	    	    	}
	    	    }
	    		return display;
	     }
	},{
		"title":"售卖状态",
		"dataIndex" : "state",
		"cls" : null,
		"width" : "10%",
		 render: stateConvertor
	},{
		"title":"商品描述",
		"dataIndex" : "descript",
		"cls" : null,
		"width" : "10%"
	}];
	function priceConvertor(value, type) {
    	if(value==null){
    		return value
    	}
        return value / 100;
    }
	function stateConvertor(value, type) {//0售卖中  1暂停售卖
        var display = "";
        if ("display" == type) {
            switch (value) {
                case "0":
                    display = "售卖中";
                    break;
                case "1":
                    display = "暂停售卖";
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
			this.elements = {
				bar : {
					id : "goods_list_bar",
					"class" : null
				},
				table : {
					id : "goods_list_table",
					"class" : null
				},
				paging : {
					id : "goods_list_paging",
					"class" : null
				}
			};
		    this._render();
		},
		_render:function(){
			$("#goods_list").css("width",$(".wrap").width());
			$("#goods_list_paging").css("width",$(".wrap").width());
			
			$("#goods_list").css("height",$("#content-operation-menu").height() - $(".container-hd").height() - $(".main_hd").height());
			
		    var listHeight = $("#goods_list").height();
	        var barHeight = $("#goods_list_bar").height()*2;
		    var tableHeight=listHeight - barHeight - 5;
		    $("#goods_list_table").css("height",tableHeight);
		    
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
				selector : "#goods_list_table",
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
		    var height = $("#goods_list_table").height()+"px";
	        $("#goods_list_table-table").freezeHeader({ 'height': height });
			this.setDataTable();
		},
		setDataTable : function() {
			this.loadTableData(30,0);
		},
		loadTableData : function(limit,cursor) {
			cloud.util.mask("#goods_list_table");
        	var self = this;
        	var name = $("#name").val();
        	if(name){
        		name = self.stripscript(name);
        	}
        	var type = $("#type").find("option:selected").val();
        	var state= $("#state").find("option:selected").val();
        	
        	self.searchData={
        			name:name,
        			typeID:type,
        			state:state
        	};
            Service.getAllgoods(self.searchData,limit,cursor,function(data){
	   				 var total = data.result.length;
	   				 self.pageRecordTotal = total;
	   	        	 self.totalCount = data.result.length;
	           		 self.listTable.render(data.result);
	   	        	 self._renderpage(data, 1);
	   	        	 cloud.util.unmask("#goods_list_table");
   			}, self);
			
		},
		 _renderpage:function(data, start){
			 var self = this;
			 if(self.page){
				 self.page.reset(data);
			 }else{
				 self.page = new Paging({
        			selector : $("#goods_list_paging"),
        			data:data,
    				current:1,
    				total:data.total,
    				limit:this.pageDisplay,
        			requestData:function(options,callback){
        				cloud.util.mask("#goods_list_table");
        				Service.getAllgoods(self.searchData, options.limit,options.cursor,function(data){
        				   self.pageRecordTotal = data.total - data.cursor;
						   callback(data);
						   cloud.util.unmask("#goods_list_table");
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
				selector : "#goods_list_bar",
				events : {
					  query: function(){
						  self.loadTableData($(".paging-limit-select").val(),0);
					  },
					  add:function(){
						  if (this.addPro) {
	                            this.addPro.destroy();
	                        }
	                        this.addPro = new Addgoods({
	                            selector: "body",
	                            events: {
	                                "getgoodsList": function() {
	                                	self.loadTableData($(".paging-limit-select").val(),0);
	                                }
	                            }
	                        });
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
	                            this.modifyPro = new Addgoods({
	                                selector: "body",
	                                id: _id,
	                                events: {
	                                    "getgoodsList": function() {
	                                    	self.loadTableData($(".paging-limit-select").val(),0);
	                                    }
	                                }
	                            });
	                        }
					  },
					  drop:function(){
						  cloud.util.mask("#goods_list_table");
	                        var idsArr = self.getSelectedResources();
	                        if (idsArr.length == 0) {
	                            cloud.util.unmask("#goods_list_table");
	                            dialog.render({lang: "please_select_at_least_one_config_item"});
	                            return;
	                        } else {
	                        	cloud.util.unmask("#goods_list_table");
	                            var ids = "";
	                            for (var i = 0; i < idsArr.length; i++) {
	                                if (i == idsArr.length - 1) {
	                                    ids = ids + idsArr[i].id;
	                                } else {
	                                    ids = ids + idsArr[i].id + ",";
	                                }
	                            }
	                            dialog.render({
	                                lang: "affirm_delete",
	                                buttons: [{
	                                        lang: "affirm",
	                                        click: function() {
	                                            self.listTable.mask();
	                                            if(ids.length>0){
	                                            	for(var i=0;i<ids.length;i++){
	                                            		var id = ids[i];
	                                            		 Service.deleteGoodsById(id, function(data) {
	 	                                            		if(data.result == "success"){
	 	                                            			  if (self.pageRecordTotal == 1) {
	 	                                                              var cursor = ($(".paging-page-current").val() - 2) * $(".paging-limit-select").val();
	 	                                                              if (cursor < 0) {
	 	                                                                  cursor = 0;
	 	                                                              }
	 	                                                              self.loadTableData($(".paging-limit-select  option:selected").val(), cursor);
	 	                                                          } else {
	 	                                                              self.loadTableData($(".paging-limit-select  option:selected").val(), 0);
	 	                                                          }
	 	                                                          self.pageRecordTotal = self.pageRecordTotal - 1;
	 	                                                          dialog.render({text: "删除成功"});
	 	                                            		}
	 	                                            }, self);
	 	                                            
	                                            	}
	                                            }
	                                            self.listTable.unmask();
 	                                            dialog.close();
	                                        }
	                                    },
	                                    {
	                                        lang: "cancel",
	                                        click: function() {
	                                            self.listTable.unmask();
	                                            dialog.close();
	                                        }
	                                    }]
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