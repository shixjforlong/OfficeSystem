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
				title: "会员信息管理",
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
			this._renderForm();
			this._renderBtn();
		    this._renderGetData();
		},
		_renderForm:function(){				
		
			var htmls1= "<table width='90%' style='margin-left:80px;margin-top:10px;height: 150px;' border='0'>"
				        +"<tr style='height:30px;'>"
				        + "<td width='15%' height='20px' style='font-size: 12px;'><label style='color:red;'>*</label> <label>昵称</label></td>"
				        + "<td  height='20px'><span id='nickNames'></span></td>"
				        +"</tr>"
					    +"<tr style='height:30px;'>"
						+ "<td width='15%' height='20px' style='font-size: 12px;'><label style='color:red;'>*</label> <label>积分</label></td>"
						+ "<td  height='20px'><input style='border-radius: 0px;width: 270px;height: 32px; margin-left: 0px;' type='text' id='integration' name='integration' /></td>"
						+"</tr>"
						+"<tr style='height:30px;'>"
					    + "<td width='15%' height='20px' style='font-size: 12px;'><label style='color:red;'>&nbsp;</label> <label>经验值</label></td>"
						+ "<td  height='20px'><input style='border-radius: 0px;width: 270px;height: 32px; margin-left: 0px;' type='text' id='empirical' name='empirical'/></td>"
						+"</tr>"
					    + " </table>"
					    + "<div style='text-align: right;width: 94%;margin-top: 10px;border-top: 1px solid #f2f2f2;margin-left: 18px;'><a id='product-config-save' class='btn btn-primary submit' style='margin-top: 8px;'>保存</a><a id='product-config-cancel' style='margin-left: 10px;margin-top: 8px;' class='btn btn-primary submit'>取消</a></div>";
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
	        	   var empirical = $("#empirical").val();
	     		   var integration = $("#integration").val();
	     		  
	     		   var finaldata={
	     				  empirical:empirical,
	     				 integration:integration
	 	           };
	     		   if(self._id){
	     			  Service.updatewxuser(self._id,finaldata,function(data){
                    	   if(data.error!=null){
    	                	  
    	                	}else{
    							self.window.destroy();
    		 	             	self.fire("getwxuserList");
    						}
    			       });
	     		   }
	        });
		},
		_renderGetData:function(){
			if(this._id){
				Service.getwxuserInfoById(this._id,function(data){
					 $("#nickNames").text(data.result.nickName==null?"":data.result.nickName);
		     		 $("#empirical").val(data.result.empirical==null?"0":data.result.empirical);
		     		 $("#integration").val(data.result.integration==null?"0":data.result.integration);
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