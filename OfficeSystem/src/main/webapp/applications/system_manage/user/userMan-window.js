define(function(require){
	var cloud = require("cloud/base/cloud");
	var _Window = require("cloud/components/window");
	var Table = require("cloud/components/table");
	var Button = require("cloud/components/button");
	var Uploader = require("cloud/components/uploader");
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
			var bo = $("body");
			var self = this;
			this.window = new _Window({
				container: "body",
				title: "用户管理",
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
		    //this._renderGetData();
		},
		_renderForm:function(){				
		
			var htmls1= "<table width='90%' style='margin-left:80px;margin-top:10px;height: 150px;' border='0'>"
					    +"<tr style='height:30px;'>"
						+ "<td width='25%' height='20px' style='font-size: 12px;'><label style='color:red;'>*</label> <label>用户名</label></td>"
						+ "<td  height='20px'><input style='border-radius: 0px;width: 270px;height: 22px; margin-left: 0px;' type='text' id='name' name='name' /></td>"
						+"</tr>"
						+"<tr style='height:30px;'>"
						+ "<td width='25%' height='20px' style='font-size: 12px;'><label style='color:red;'>&nbsp;</label> <label>邮箱</label></td>"
						+ "<td  height='20px'><input style='border-radius: 0px;width: 270px;height: 22px; margin-left: 0px;' type='text' id='email' name='email' /></td>"
						+"</tr>"
						+"<tr style='height:30px;'>"
					    + "<td width='25%' height='20px' style='font-size: 12px;'><label style='color:red;'>&nbsp;</label> <label>密码</label></td>"
						+ "<td  height='20px'><input style='border-radius: 0px;width: 270px;height: 22px; margin-left: 0px;' type='text' id='password' name='password'/></td>"
						+"</tr>"
						+"<tr style='height:30px;'>"
					    + "<td width='25%' height='20px' style='font-size: 12px;'><label style='color:red;'>&nbsp;</label> <label>手机号</label></td>"
						+ "<td  height='20px'><input style='border-radius: 0px;width: 270px;height: 22px; margin-left: 0px;' type='text' id='phone' name='phone'/></td>"
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
	        	   var name = $("#name").val();
	     		   var email = $("#email").val();
	     		   var password = $("#password").val();
	     		   var phone=$("#phone").val();
	     		   if(name==null||name.replace(/(^\s*)|(\s*$)/g,"")==""){
          			   dialog.render({text:"用户名不能为空"});
          			   return;
          		   };
          		   if(email==null||email.replace(/(^\s*)|(\s*$)/g,"")==""){
        			   dialog.render({text:"邮箱不能为空"});
        			   return;
        		   };
        		   if(password==null||password.replace(/(^\s*)|(\s*$)/g,"")==""){
        			   dialog.render({text:"密码不能为空"});
        			   return;
        		   };
        		   if(phone==null||phone.replace(/(^\s*)|(\s*$)/g,"")==""){
        			   dialog.render({text:"手机号不能为空"});
        			   return;
        		   };
          		   
	     		   var finaldata={
	 	             		name:name,
	 	             		email:email,
	 	             		password:password,
	 	             		phone:phone
	 	           };
	     		   if(self._id){
	     			  Service.updateUser(self._id,finaldata,function(data){
                    	   if(data.error!=null){
    	                	  
    	                	}else{
    							self.window.destroy();
    		 	             	self.fire("getUserList");
    						}
    			       });
	     		   }else{
	     			  Service.addUser(finaldata,function(data){
	 	                	if(data.error!=null){
	 	                	   
	 	                	}else{
								self.window.destroy();
			 	             	self.fire("getUserList");
							}
	 				   });
	     		   }
	        });
		},
		_renderGetData:function(){
			var self = this;
			if(this._id){
				Service.getUserById(this._id,function(data){
		     		 $("#name").val(data.result.name==null?"":data.result.name);
		     		 $("#email").val(data.result.email==null?"":data.result.email);
		  		     $("#password").val(data.result.password==null?"":data.result.password);
		  		     $("#phone").val(data.result.phone==null?"":data.result.phone);	
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