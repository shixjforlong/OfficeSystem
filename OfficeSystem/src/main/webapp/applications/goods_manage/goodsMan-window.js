define(function(require){
	var cloud = require("cloud/base/cloud");
	var _Window = require("cloud/components/window");
	require("cloud/lib/plugin/jquery.uploadify");
	var Service = require("./service");
	
	var Window = Class.create(cloud.Component,{
		initialize:function($super,options){
			$super(options);
			this._id = options.id;
			this._renderWindow();
			locale.render({element:this.element});
		},
		_renderWindow:function(){
			this.window = new _Window({
				container: "body",
				title: "商品管理",
				top: "center",
				left: "center",
				height:252,
				width: 650,
				mask: true,
				drag:true,
				content: "<div id='winContent' style='border-top: 1px solid #f2f2f2;'></div>",
				events: {
					"onClose": function() {
							this.window.destroy();
							cloud.util.unmask();
					},
					scope: this
				}
			});
			this.window.show();	
			//this._renderForm();
			//this._renderBtn();
		    //this._renderGetData();
		},
		_renderForm:function(){				
		
			var htmls1= "<table width='90%' style='margin-left:80px;margin-top:10px;height: 150px;' border='0'>"
					    +"<tr style='height:30px;'>"
						+ "<td width='25%' height='20px' style='font-size: 12px;'><label style='color:red;'>*</label> <label>商品分类名称</label></td>"
						+ "<td  height='20px'><input style='border-radius: 0px;width: 270px;height: 22px; margin-left: 0px;' type='text' id='typeName' name='typeName' /></td>"
						+"</tr>"
						+"<tr style='height:30px;'>"
					    + "<td width='25%' height='20px' style='font-size: 12px;'><label style='color:red;'>&nbsp;</label> <label>描述</label></td>"
						+ "<td  height='20px'><input style='border-radius: 0px;width: 270px;height: 22px; margin-left: 0px;' type='text' id='desc' name='desc'/></td>"
						+"</tr>"
					    + " </table>"
					    + "<div style='text-align: right;width: 94%;margin-top: 10px;border-top: 1px solid #f2f2f2;'><a id='product-config-save' class='btn btn-primary submit' style='margin-top: 8px;'>保存</a><a id='product-config-cancel' style='margin-left: 10px;margin-top: 8px;' class='btn btn-primary submit'>取消</a></div>";
	        $("#winContent").append(htmls1);
	        $("#ui-window-content").css("overflow","hidden");
		},
		_renderBtn:function(){
			var self = this;
		    //取消
		    $("#product-config-cancel").bind("click",function(){
		    	self.window.destroy();
		    });
            //保存
		    $("#product-config-save").bind("click",function(){
	        	   var name = $("#typeName").val();
	     		   var desc = $("#desc").val();
	     		   if(name==null||name.replace(/(^\s*)|(\s*$)/g,"")==""){
          			   dialog.render({text:"用商品分类名称不能为空"});
          			   return;
          		   };
          		   
	     		   var finaldata={
	 	             		name:name,
	 	             		desc:desc
	 	           };
	     		   if(self._id){
	     			  Service.updateGoodsType(self._id,finaldata,function(data){
                    	   if(data.error!=null){
    	                	  
    	                	}else{
    							self.window.destroy();
    		 	             	self.fire("getGoodsTypeList");
    						}
    			       });
	     		   }else{
	     			  Service.addGoodsType(finaldata,function(data){
	 	                	if(data.error!=null){
	 	                	}else{
								self.window.destroy();
			 	             	self.fire("getGoodsTypeList");
							}
	 				   });
	     		   }
	        });
		},
		_renderGetData:function(){
			if(this._id){
				Service.getGoodsTypeInfoById(this._id,function(data){
		     		 $("#typeName").val(data.result.name==null?"":data.result.name);
		     		 $("#desc").val(data.result.desc==null?"":data.result.desc);
				});
			}
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