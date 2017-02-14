$(function() {
	$("#login").click(function(){
		$("#errorMessage").text("");
		var username = $("#username").val();
		var password = $("#password").val();
		if(username == null || username == ""){
			$("#errorMessage").text("用户名不能为空");
			return;
		}
		if(password == null || password == ""){
			$("#errorMessage").text("密码不能为空");
			return;
		}
		
		var url="/sapi/user/list?limit=1&cursor=0";
        if(username){
        	url = url+"&name="+username;
        }
        if(password){
        	url = url+"&password="+password;
        }
        $.ajax({
            url: url,
            type: "GET",
            success: function(data) {
                if(data.result.length>0){
                	window.sessionStorage.setItem("userName",username);
        			window.sessionStorage.setItem("number",data.result[0].number);
        			window.sessionStorage.setItem("shopName",data.result[0].shopName);
        			window.location.replace("../applications/index.html");
                	
                }else{
                	$("#errorMessage").text("用户名或者密码不正确");
        			return;
                }
            }
        });
	});
});

	
