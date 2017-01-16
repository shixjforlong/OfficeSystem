define(function(require){
	require("cloud/base/cloud");
	require("cloud/base/fixTableHeader");
	var layout = require("cloud/lib/plugin/jquery.layout");
	var html = require("text!./list.html");
	var NoticeBar = require("./notice-bar");
	var Table = require("cloud/components/table");
	var Button = require("cloud/components/button");
	var Paging = require("cloud/components/paging");
	var Adduser = require("./userMan-window");
	var columns = [ {
		"title":"用户名",
		"dataIndex" : "name",
		"cls" : null,
		"width" : "20%"
	},{
		"title":"邮箱",
		"dataIndex" : "email",
		"cls" : null,
		"width" : "20%"
	},{
		"title":"密码",
		"dataIndex" : "password",
		"cls" : null,
		"width" : "25%"
	},{
		"title":"手机号",
		"dataIndex" : "phone",
		"cls" : null,
		"width" : "20%"
	},{                                             
		"title":"创建时间",
		"dataIndex" : "createTime",
		"cls" : null,
		"width" : "20%",
		render:function(data, type, row){
			if(data){
				return cloud.util.dateFormat(new Date(data), "yyyy-MM-dd hh:mm:ss");
			}
			
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
					id : "user_list_bar",
					"class" : null
				},
				table : {
					id : "user_list_table",
					"class" : null
				},
				paging : {
					id : "user_list_paging",
					"class" : null
				}
			};
		    this._render();
		},
		_render:function(){
			$("#user_list").css("width",$(".wrap").width());
			$("#user_list_paging").css("width",$(".wrap").width());
			
			$("#user_list").css("height",$("#content-operation-menu").height() - $(".container-hd").height() - $(".main_hd").height());
			
		    var listHeight = $("#user_list").height();
	        var barHeight = $("#user_list_bar").height()*2;
		    var tableHeight=listHeight - barHeight - 5;
		    $("#user_list_table").css("height",tableHeight);
		    
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
				selector : "#user_list_table",
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
		    var height = $("#user_list_table").height()+"px";
	        $("#user_list_table-table").freezeHeader({ 'height': height });
			this.setDataTable();
		},
		setDataTable : function() {
			//this.loadTableData(30,0);
		},
		loadTableData : function(limit,cursor) {
			cloud.util.mask("#user_list_table");
        	var self = this;
        	var name = $("#name").val();
        	if(name){
        		name = self.stripscript(name);
        	}
        	self.searchData={
        			name:name
        	};
            Service.getAllUser(self.searchData,limit,cursor,function(data){
	   				 var total = data.result.length;
	   				 self.pageRecordTotal = total;
	   	        	 self.totalCount = data.result.length;
	           		 self.listTable.render(data.result);
	   	        	 self._renderpage(data, 1);
	   	        	 cloud.util.unmask("#user_list_table");
   			}, self);
			
		},
		 _renderpage:function(data, start){
			 var self = this;
			 if(self.page){
				 self.page.reset(data);
			 }else{
				 self.page = new Paging({
        			selector : $("#user_list_paging"),
        			data:data,
    				current:1,
    				total:data.total,
    				limit:this.pageDisplay,
        			requestData:function(options,callback){
        				cloud.util.mask("#user_list_table");
        				Service.getAllUser(self.searchData, options.limit,options.cursor,function(data){
        				   self.pageRecordTotal = data.total - data.cursor;
						   callback(data);
						   cloud.util.unmask("#user_list_table");
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
				selector : "#user_list_bar",
				events : {
					  query: function(){
						  self.loadTableData($(".paging-limit-select").val(),0);
					  },
					  add:function(){
						  if (this.addPro) {
	                            this.addPro.destroy();
	                        }
	                        this.addPro = new Adduser({
	                            selector: "body",
	                            events: {
	                                "getUserList": function() {
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
	                        	var _id = selectedResouces[0]._id;
	                        	if (this.modifyPro) {
	                                this.modifyPro.destroy();
	                            }
	                            this.modifyPro = new Adduser({
	                                selector: "body",
	                                id: _id,
	                                events: {
	                                    "getUserList": function() {
	                                    	self.loadTableData($(".paging-limit-select").val(),0);
	                                    }
	                                }
	                            });
	                        }
					  },
					  drop:function(){
						  cloud.util.mask("#user_list_table");
	                        var idsArr = self.getSelectedResources();
	                        if (idsArr.length == 0) {
	                            cloud.util.unmask("#user_list_table");
	                            dialog.render({lang: "please_select_at_least_one_config_item"});
	                            return;
	                        } else {
	                        	cloud.util.unmask("#user_list_table");
	                            var ids = "";
	                            for (var i = 0; i < idsArr.length; i++) {
	                                if (i == idsArr.length - 1) {
	                                    ids = ids + idsArr[i]._id;
	                                } else {
	                                    ids = ids + idsArr[i]._id + ",";
	                                }
	                            }
	                            dialog.render({
	                                lang: "affirm_delete",
	                                buttons: [{
	                                        lang: "affirm",
	                                        click: function() {
	                                            self.listTable.mask();
	                                            Service.deleteUserById(ids, function(data) {
	                                            	if(data.result){
	                                            		if(data.result.error_code && data.result.error_code=="70014"){
	                                            			dialog.render({lang: "this_user_has_line"});
	                                                        self.loadTableData($(".paging-limit-select  option:selected").val(), cursor, "");
	                                                    }
	                                            	  }else{
	                                            		if(data.status == "OK"){
	                                            			  if (self.pageRecordTotal == 1) {
	                                                              var cursor = ($(".paging-page-current").val() - 2) * $(".paging-limit-select").val();
	                                                              if (cursor < 0) {
	                                                                  cursor = 0;
	                                                              }
	                                                              self.loadTableData($(".paging-limit-select  option:selected").val(), cursor, "");
	                                                          } else {
	                                                              self.loadTableData($(".paging-limit-select  option:selected").val(), cursor, "");
	                                                          }
	                                                          self.pageRecordTotal = self.pageRecordTotal - 1;
	                                                          dialog.render({lang: "deletesuccessful"});
	                                            		}
	                                            	 }
	                                                
	                                            }, self);
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