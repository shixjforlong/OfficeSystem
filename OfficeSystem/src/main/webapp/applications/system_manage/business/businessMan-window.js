define(function(require){
	var cloud = require("cloud/base/cloud");
	var _Window = require("cloud/components/window");
	require("cloud/lib/plugin/jquery.uploadify");
	var Service = require("./service");
	
	var Window = Class.create(cloud.Component,{
		initialize:function($super,options){
			$super(options);
			this.number = options.number;
			this._renderWindow();
			locale.render({element:this.element});
		},
		_renderWindow:function(){
			this.window = new _Window({
				container: "body",
				title: "店铺管理",
				top: "center",
				left: "center",
				height:390,
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
				        +"<tr style='height:40px;'>"
					     + "<td width='25%' height='20px' style='font-size: 12px;'><label style='color:red;'>*</label> <label>商家编号</label></td>"
					     + "<td  height='20px'><input style='border-radius: 0px;width: 270px;height: 32px; margin-left: 0px;' type='text' id='number' name='number' /></td>"
					    +"</tr>"
					    +"<tr style='height:40px;'>"
						+ "<td width='25%' height='20px' style='font-size: 12px;'><label style='color:red;'>*</label> <label>商家名称</label></td>"
						+ "<td  height='20px'><input style='border-radius: 0px;width: 270px;height: 32px; margin-left: 0px;' type='text' id='bussinessName' name='bussinessName' /></td>"
						+"</tr>"
						+"<tr style='height:40px;'>"
					    + "<td width='25%' height='20px' style='font-size: 12px;'><label style='color:red;'>*</label> <label>客服电话</label></td>"
						+ "<td  height='20px'><input style='border-radius: 0px;width: 270px;height: 32px; margin-left: 0px;' type='text' id='phone' name='phone'/></td>"
						+"</tr>"
						+"<tr style='height:40px;'>"
					    + "<td width='25%' height='20px' style='font-size: 12px;'><label style='color:red;'>*</label> <label>商家地址</label></td>"
						+ "<td  height='20px'><input style='border-radius: 0px;width: 270px;height: 32px; margin-left: 0px;' type='text' id='address' name='address'/></td>"
						+"</tr>"
						+"<tr style='height:40px;'>"
					    + "<td width='25%' height='20px' style='font-size: 12px;'><label style='color:red;'>*</label> <label>配送时间</label></td>"
						+ "<td  height='20px'><input style='border-radius: 0px;width: 270px;height: 32px; margin-left: 0px;' type='text' id='servicetime' name='servicetime'/></td>"
						+"</tr>"
						+"<tr style='height:40px;'>"
					    + "<td width='25%' height='20px' style='font-size: 12px;'><label style='color:red;'>*</label> <label>配送服务</label></td>"
						+ "<td  height='20px'><input style='border-radius: 0px;width: 270px;height: 32px; margin-left: 0px;' type='text' id='service' name='service'/></td>"
						+"</tr>"
						+"<tr style='height:40px;'>"
					    + "<td width='25%' height='20px' style='font-size: 12px;'><label style='color:red;'>&nbsp;</label> <label>优惠活动</label></td>"
						+ "<td  height='20px'><input style='border-radius: 0px;width: 270px;height: 32px; margin-left: 0px;' type='text' id='activity' name='activity'/></td>"
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
		    	var number = $("#number").val();
		    	var name = $("#bussinessName").val();
	            var phone = $("#phone").val();
	            var address = $("#address").val();
	            var servicetime = $("#servicetime").val();
	            var service = $("#service").val();
	            var activity = $("#activity").val();
	            if(name =="" || name==null){
	               	 dialog.render({text:"商家名称不能为空"});
	       			 return;
	            }
	            if(phone =="" || phone==null){
	              	 dialog.render({text:"客服电话不能为空"});
	      			 return;
	            }
	            if(address =="" || address==null){
	             	 dialog.render({text:"商家地址不能为空"});
	     			 return;
	            }
	            if(servicetime =="" || servicetime==null){
	            	 dialog.render({text:"营业时间不能为空"});
	    			return;
	            }
	            if(service =="" || service==null){
	            	 dialog.render({text:"配送服务不能为空"});
	    			return;
	            }
          		   
	            $.ajax({
                    url: "/wapi/map/baidu/getLocation?address="+address,
                    type: "GET",
                    success: function(datas) {
                    	var addressObj_ = eval('(' + datas + ')');
                    	var location_s = addressObj_.result.location;//商家店铺的经纬度
                    	var lat = location_s.lat;
                    	var lng = location_s.lng;
                    	
                    	 var finaldata = {
         	            		number:number,
         	            		name:name,
         	            		phone:phone,
         	            		address:address,
         	            		servicetime: servicetime,
         	            		service:service,
         	            		activity:activity,
         	            		lat:lat,
         	            		lng:lng
         	            };
                      if(self.number){
       	     			  Service.updateBusinessConfig(self.number,finaldata,function(data){
                           	   if(data.error!=null){
           	                	}else{
           							self.window.destroy();
           		 	             	self.fire("getbusinessList");
           						}
           			       });
       	     		  }else{
       	     			  Service.addBusiness(finaldata,function(data){
       	 	                	if(data.error!=null){
       	 	                	}else{
       								self.window.destroy();
       			 	             	self.fire("getbusinessList");
       							}
       	 				   });
       	     		  }
                    }
        		});
	        });
		},
		_renderGetData:function(){
			if(this.number){
				Service.getBusinessConfig(this.number,function(data){
		     		 $("#number").val(data.result[0].number==null?"":data.result[0].number);
		     		 $("#bussinessName").val(data.result[0].name==null?"":data.result[0].name);
		     		 $("#phone").val(data.result[0].phone==null?"":data.result[0].phone);
		     		 $("#address").val(data.result[0].address==null?"":data.result[0].address);
		     		 $("#servicetime").val(data.result[0].servicetime==null?"":data.result[0].servicetime);
		     		 $("#service").val(data.result[0].service==null?"":data.result[0].service);
		     		 $("#activity").val(data.result[0].activity==null?"":data.result[0].activity);
		     		 
		     		 $("#number").attr("disabled",true);
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