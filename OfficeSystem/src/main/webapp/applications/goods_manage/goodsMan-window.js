define(function(require){
	var cloud = require("cloud/base/cloud");
	var _Window = require("cloud/components/window");
	require("cloud/lib/plugin/jquery.uploadify");
	var Service = require("./service");
	var winHtml = require("text!./goodsManage.html");
	var Uploader = require("cloud/components/uploader");
	require("cloud/lib/plugin/jquery.uploadify");
	var Button = require("cloud/components/button");
	
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
			this._renderGoodsTable();
			this._renderBtn();
			//this.initUploader();
			
		    //this._renderGetData();
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
		initUploader:function(){
            this.uploader = new Uploader({
                browseElement: $("#select_file_button"),
                url: "/api/file",
                autoUpload: true,
                filters: [{
                    title: "Image files",
                    extensions: "jpg,gif,png"
                }],
                maxFileSize: "1mb",
                events: {
                	"onError": function(err){
						cloud.util.unmask("#winContent");
					},
					"onFilesAdded" : function(file){
						var name=file[0].name;
					},
                    "onFileUploaded": function(response, file){
                    	if ($.isPlainObject(response)){
                    		if(response.error){
                    			dialog.render({text:"上传文件失败"});
							}else{
								var src= cloud.config.FILE_SERVER_URL + "/api/file/" +response.result._id+ "?access_token=" + cloud.Ajax.getAccessToken();
		                        $("#photoFileId").attr("src", src);
		                        $("#imagepath").val(response.result._id);
		                        $("#imageMd5").val(response.result.md5);
							}
                    	}
                    	
                    	cloud.util.unmask("#winContent");
                    },
                    "beforeFileUpload":function(){
						cloud.util.mask(
		                	"#winContent",
		                	locale.get("uploading_files")
		                );
					}
                }
            });
		},
		_renderBtn:function(){
			var self = this;
			/*self.uploadButton=new Button({
	                container:$("#select_file_button"),
	                text:"选择文件",
	                lang : "{title:'请选择文件',text:'请选择文件'}"
	        });*/
			$("#uploadFile").bind("click",function(){
				var files = document.getElementById("file").files;
			    for(var i = 0; i < files.length; i+=1) {
			        var file = files[i];
			        console.log(file);
			        console.log(file.name);
			     }
			});
            //保存
		    $("#save").bind("click",function(){
	        	  
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