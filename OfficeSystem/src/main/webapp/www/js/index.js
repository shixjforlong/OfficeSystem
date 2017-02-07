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
		if(username =="admin" && password == "123456"){
			window.location.replace("../applications/index.html");
		}else{
			$("#errorMessage").text("用户名或者密码不正确");
			return;
		}
		
	});
});

	
