define(function(require) {
	//首页
	var home = {
			name : "home",
			order : 0,
			id:"sg-home",
			subNavs : [ {
				name : "homepage",
				order : 0,
				defaultOpen : true,
				defaultShow : true,
				url : ""
			} ]
		};
	//系统
	var system = {
		name : "system",
		order :1,
		id:"sg-system",
		subNavs:[{
			name:"system_manage",
			order : 0,
			defaultOpen : false,
			defaultShow : true,
			subModule:[
			{                       
				name : "user_manage", //用户管理
				defaultShow : true,
				order : 0,
				operation:["r","w"],
				url : "./system_manage/user/userMain.js"
			}]
		}]
	};
	
	
	var appConfig = {
		modules : [ home,system]
	}

	return appConfig;
})