define(function(require){
	var cloud = require("cloud/base/cloud");
	var _Window = require("cloud/components/window");
	require("cloud/lib/plugin/jquery.uploadify");
	var Service = require("./service");
	var winHtml = require("text!./goodsManage.html");
	require("cloud/lib/plugin/jquery.uploadify");
	var uploadFile = require("./upload/upload-window");
	
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
				height:600,
				width: 900,
				mask: true,
				drag:true,
				content:winHtml,
				events: {
					"onClose": function() {
							this.window.destroy();
							cloud.util.unmask();
					},
					scope: this
				}
			});
			this.window.show();	
			$("#save").val("保存");
			$("#add").val("新增一行");
			$("#imageLimit").text("(支持格式为jpg,gif,png且大小不大于1Mb的图片)");
			this._renderGoodsType();//获取商品分类
			this._renderGoodsTable();
			this._renderBtn();
		    this._renderGetData();
		},
		_renderGoodsType:function(){
			var self = this;
			self.searchData={
        			name:''
        	};
            Service.getAllGoodsType(self.searchData,1000,0,function(data){
            	console.log(data);
            	$("#goodsType").append("<option value='-1'>请选择</option>");
            	if(data.result && data.result.length>0){
            		for(var i=0;i<data.result.length;i++){
            			$("#goodsType").append("<option value='" +data.result[i].id + "'>" +data.result[i].name+"</option>");
            		}
            	}
            });
		},
		_renderGoodsTable:function(){
			$('#goodsTable').append("<table id='productTable' style='border: 1px solid #e7e7eb;'>"+
				   "<tr class='trClass'>"+
				    "<td  class='TDClass'>"+
				       "<div  style='width:100px;'>商品名称</div>"+
				     "</td>"+
				     "<td class='TDClass'>"+
				       "<div  style='width:100px;'>商品价格</div>"+
				     "</td>"+
				     "<td class='TDClass'>"+
				       "<div  style='width:100px;'>餐盒价格</div>"+
				     "</td>"+
				     "<td class='TDClass'>"+
				       "<div  style='width:100px;'>餐盒数量</div>"+
				     "</td>"+
				     "<td class='TDClass'>"+
				       "<div>操作</div>"+
				     "</td>"+
				   "</tr>"+
				"</table>"
			);
			this.tdEdit();
		},
		tdEdit:function(){
			$('.tdclass').click(function () {
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
		},
		_renderBtn:function(){
			var self = this;
			$("#uploadFile").bind("click",function(){
				if (this.uploadGoodsImage) {
                    this.uploadGoodsImage.destroy();
                }
                this.uploadGoodsImage = new uploadFile({
                    selector: "body",
                    events: {
                        "getGoodsImage": function(fileName) {
                        	$("#fileName").val(fileName);
                        	$("#photoFileId").attr("src","http://101.201.150.141/file/"+fileName);
                        }
                    }
                });
			});
            //保存
		    $("#save").bind("click",function(){
		    	var typeId = $("#goodsType").find("option:selected").val(); //商品分类
		    	var typeName= $("#goodsType").find("option:selected").text(); //商品分类名称
		    	var goodsName = $("#goodsName").val();//商品名称
		    	var saleState = $("#saleState").find("option:selected").val(); //售卖状态
		    	var descript = $("#descript").val();//商品描述
		    	var fileName = $("#fileName").val();//商品图片名称
		    	if(typeId==null||typeId=="-1"){
	     		   dialog.render({text:"请选择商品分类"});
	     		   return;
	     		}
		    	if(goodsName==null||goodsName==""){
		     	   dialog.render({text:"商品名称不能为空"});
		     	   return;
		     	}
		    	if(fileName==null||fileName==""){
			       dialog.render({text:"请上传商品图片"});
			       return;
			    }
		    	
		    	//商品规格
		        var specifications = "";
		        var price = 0;
		    	var tableObj =document.getElementById("productTable");
		    	if(tableObj && tableObj.rows.length ==0 ){
		    		dialog.render({text:"请给商品规格至少添加一组数据"});
	         		return;
		    	}else{
		    		for(var i=0;i<tableObj.rows.length;i++){
		    			if(i>0){
		    				for(var j=0;j<tableObj.rows[i].cells.length-1;j++){
	                			var cell = tableObj.rows[i].cells[j].children[0].innerText;
							    if(j == 3){
							    	specifications += cell+";";
								}else{
									specifications += cell+",";
								}
					    	}
		    				var box = parseInt(tableObj.rows[i].cells[2].children[0].innerText) * parseInt(tableObj.rows[i].cells[3].children[0].innerText)
			    			price = parseInt(price) + parseInt(tableObj.rows[i].cells[1].children[0].innerText) + box;
		    			}
					}
		    	}
		    	var goodsData={
		    			name:goodsName,
		    			imageName:fileName,
		    			price:price*100,
		    			typeID:typeId,
		    			typeName:typeName,
		    			state:saleState,
		    			descript:descript,
		    			specifications:specifications
		    	};
		    	if(self._id){
		    		Service.updateGoods(self._id,goodsData,function(data){
                 	   if(data.error!=null){
 	                	}else{
 							self.window.destroy();
 		 	             	self.fire("getgoodsList");
 						}
 			       });
		    	}else{
		    		Service.addGoods(goodsData,function(data){
 	                	if(data.error!=null){
 	                	}else{
							self.window.destroy();
		 	             	self.fire("getgoodsList");
						}
 				   });
		    	}
		    	
	        });
		    
		    var i=1000000;
		    $("#add").click(function () {
		    	$('#productTable').append(
		    			 "<tr class='trClass' id="+i+">"+
						    "<td  class='TDClass'>"+
						       "<div  class='"+i+"_tdclass' style='width:100px;color:blue;'>商品名称</div>"+
						     "</td>"+
						     "<td class='TDClass'>"+
						       "<div  class='"+i+"_tdclass' style='width:100px;color:blue;'>1</div>"+
						     "</td>"+
						     "<td class='TDClass'>"+
						       "<div  class='"+i+"_tdclass' style='width:100px;color:blue;'>1</div>"+
						     "</td>"+
						     "<td class='TDClass'>"+
						       "<div  class='"+i+"_tdclass' style='width:100px;color:blue;'>1</div>"+
						     "</td>"+
						     "<td class='TDClass'>"+
						       "<div style='cursor: pointer;' class='delcls'>删除</div>"+
						     "</td>"+
						   "</tr>"
				);
				$(".delcls").bind('click',{id:i},function(e){
					var file = $(this).parent().parent('#'+e.data.id);
	         		file.remove();
	 			});
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
				i = i +1;
		    });
		},
		_renderGetData:function(){
			if(this._id){
				cloud.util.mask("#baseInfo");
				Service.getGoodsInfoById(this._id,function(data){
					
					$("#goodsType option[value='"+data.result.typeID+"']").attr("selected","selected");
		     		$("#goodsName").val(data.result.name==null?"":data.result.name);
		     		$("#saleState option[value='"+data.result.state+"']").attr("selected","selected");
		     		$("#descript").val(data.result.descript==null?"":data.result.descript);
		     		$("#fileName").val(data.result.imageName==null?"":data.result.imageName);
		     		$("#photoFileId").attr("src","http://101.201.150.141/file/"+data.result.imageName);
		     		if(data.result.specifications && data.result.specifications.indexOf(";") > -1){
		     			var array = data.result.specifications.split(";");
		     			if(array.length>0){
		     			    $("#productTable").html("");
		     			    $("#productTable").append(
		     			          "<tr class='trClass'>"+ 
						            "<td  class='TDClass'>"+
						               "<div  style='width:100px;'>商品名称</div>"+
						            "</td>"+
						            "<td class='TDClass'>"+
						               "<div  style='width:100px;'>商品价格</div>"+
						            "</td>"+
						            "<td class='TDClass'>"+
						               "<div  style='width:100px;'>餐盒价格</div>"+
						            "</td>"+
						            "<td class='TDClass'>"+
						               "<div  style='width:100px;'>餐盒数量</div>"+
						            "</td>"+ 
						            "<td class='TDClass'>"+
						              "<div>操作</div>"+
						            "</td>"+
						         "</tr>"
		     			    );
		     			   
		     				for(var i=0;i<array.length-1;i++){
		     					 var tds = array[i].split(",");
			        			 var op="<div style='cursor: pointer;' class='delcls'>删除</div>";
			        			 
			        			 $("#productTable").append(
		        						 "<tr class='trClass' id="+i+">"+
		        							"<td  class='TDClass'>"+
		        							   "<div class='"+i+"_tdclass'  style='color:blue;width:100px;'>"+tds[0]+"</div>"+
		        						    "</td>"+
		        							"<td  class='TDClass'>"+
		        							       "<div class='"+i+"_tdclass' style='color:blue;width:100px;'>"+tds[1]+"</div>"+
		        							"</td>"+
		        						    "<td  class='TDClass'>"+
		        							       "<div class='"+i+"_tdclass'  style='color:blue;width:100px;'>"+tds[2]+"</div>"+
		        							"</td>"+
		        							"<td  class='TDClass'>"+
	        							           "<div class='"+i+"_tdclass'  style='color:blue;width:100px;'>"+tds[3]+"</div>"+
	        							    "</td>"+
		        							"<td  class='TDClass'>"+
		        						       op+
		        						    "</td>"+
		        						 "</tr>"
		        				  );
		        			   $(".delcls").bind('click',{id:i},function(e){
		               			 var file = $(this).parent().parent('#'+e.data.id);
		               			 file.remove();
		       			       });
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
		     		}
		     		cloud.util.unmask("#baseInfo");
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