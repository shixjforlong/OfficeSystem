define(function(require){
	var cloud = require("cloud/base/cloud");
	var _Window = require("cloud/components/window");
	var winHtml = require("text!./upload.html");
	require("cloud/lib/plugin/jquery.uploadify");
	require("cloud/lib/plugin/jquery.form");
	var Service = require("../service");
	
	var Window = Class.create(cloud.Component,{
		initialize:function($super,options){
			$super(options);
			this._renderWindow();
			locale.render({element:this.element});
		},
		_renderWindow:function(){
			var bo = $("body");
			var self = this;
			this.window = new _Window({
				container: "body",
				title: "上传商品图片",
				top: "center",
				left: "center",
				height:190,
				width: 700,
				mask: true,
				drag:true,
				content: winHtml,
				events: {
					"onClose": function() {
							this.window.destroy();
							cloud.util.unmask();
					},
					scope: this
				}
			});
			
			this.window.show();	
			this._renderBtn();
		
		},
		_renderBtn:function(){
			var self = this;
		
			 //取消
		    $("#cancel").bind("click",function(){
		    	self.window.destroy();
		    });
            //保存
		    $("#input-submit").bind("click",function(){
		    	
		        var url = "http://localhost/sapi/file";
			    var options = {  
					  url:url,   
					  type:'post',   
					  success: function(data){
						 cloud.util.unmask("#windowFormID");
					     console.log(data);        	 
						 if(data.result && data.result=="success"){
							 dialog.render({text:"上传成功"});
							 self.window.destroy();
							 self.fire("getGoodsImage",data.fileName);
					     }else if(data.error != null && data.error_code == "70031"){
							 dialog.render({text:"文件数据不能为空"});
					     }else{
							 dialog.render({text:"上传文件失败"});
					     }
					  },
					  error:function(data){
						 if(data.error != null){
							   if(data.error_code == "70031"){
									dialog.render({text:"文件数据不能为空"});
							   }else{
							        dialog.render({text:"上传文件失败"});
							   }
						 }   
					  }
				 }; 
			     var uploadDoc = $("#doc").val();
				 if(uploadDoc){
					  cloud.util.mask("#windowFormID");
					  $("#windowFormID").ajaxSubmit(options);  
				 }else{
				      dialog.render({text:"请选择要上传的文档"});
				 }
	        });
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