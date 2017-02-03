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
				title: "商品分类排序",
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
		
			var htmls1= "<table width='90%' id='goodsTables' style='margin: 10px;height: 150px;border: 1px solid #e7e7eb;'>"
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
		    	var tableObj =document.getElementById("goodsTables");
		    	for(var i=0;i<tableObj.rows.length;i++){
		    		var cell = tableObj.rows[i].cells[1].children[0].innerText;
		    		var id = tableObj.rows[i].cells[1].children[0].id;
		    		var desc = tableObj.rows[i].cells[1].children[0].attributes[1].value;
		    		var name = tableObj.rows[i].cells[0].children[0].innerText;
		    		
		    	    var finaldata={
		 	             name:name,
		 	             descript:desc,
		 	             typeOrder:cell
		 	        };
		    	    Service.updateGoodsType(id,finaldata,function(data){
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
			var self = this;
			self.searchData={
        			name:''
        	};
            Service.getAllGoodsType(self.searchData,10000,0,function(data){
	   		   if(data.result && data.result.length>0){
	   			   for(var i=0;i<data.result.length;i++){
	   				var orderBy = null;
	   				if(data.result[i].typeOrder){
	   					orderBy = data.result[i].typeOrder;
	   				}else{
	   					orderBy = i+1;
	   				}
	   				$('#goodsTables').append(
	   					   "<tr class='trClass'>"+
	   					    "<td  class='TDClass' style='text-align: center;'>"+
	   					       "<div  style='width:100px;'>"+data.result[i].name+"</div>"+
	   					     "</td>"+
	   					    "<td  class='TDClass' style='text-align: center;'>"+
  					          "<div  id='"+data.result[i].id+"' desc='"+data.result[i].descript+"' class='"+i+"_tdclass' style='width:100px;color:blue;'>"+orderBy+"</div>"+
  					        "</td>"+
	   					   "</tr>"
	   				);
	   				$('.'+i+'_tdclass').bind('click',function(){
						var tdObj = $(this);
						var oldText = $(this).context.innerText;  
						if(oldText){
						}else{
						   oldText="请输入";
						}
						var inputObj = $("<input type='text' value='" + oldText + "'/>");  
						inputObj.css("border-width", '1px');  
						inputObj.click(function () {  
						    return false;  
						});  
						inputObj.width(tdObj.width());  
						inputObj.height("30"); 
						inputObj.css("line-height", '30px'); 
						inputObj.css("margin", 0);  
						inputObj.css("padding", 0);  
						inputObj.css("text-align", "center");  
						inputObj.css("color", "black");  
						inputObj.css("font-size", "12px");  
						inputObj.css("background-color",'white');  
						tdObj.html(inputObj);  
						inputObj.blur(function () {
						    var newText = $(this).val();  
						    tdObj.html(newText);          
						});  
						inputObj.trigger("focus").trigger("select"); 
					});  
	   			   }
	   		   }
   			}, self);
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