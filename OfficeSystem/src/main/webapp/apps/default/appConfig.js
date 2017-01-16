define(function(require) {
	
	//组织
	var point = {
		name : "point",
		order :1,
		id:"smartvm-point",
		subNavs:[{
			name:"point_manage",
			order : 0,
			defaultOpen : false,
			defaultShow : true,
			subModule:[
			{                       
				name : "area_manage", //区域管理
				defaultShow : true,
				order : 0,
				operation:["r","w"],
				url : "./area_manage/areaMain.js"
			},{
				name : "line_manage", //线路管理
				defaultShow : true,
				order : 1,
				operation:["r","w"],
				url : ""
			},{
				name:"site_manage",//点位管理
				defaultShow : true,
				order : 2,
				operation:["r","w"],
				url : ""
			}]
		}]
	};
	//售货机
	var smartVm={
			name : "smartVm",
			order :2,
			id:"smartvm-smartVm",
			subNavs:[{
				name:"smartVm_manage",
				order : 0,
				defaultOpen : false,
				defaultShow : true,
				subModule:[{                         //二级菜单
					name : "vendingMachine_manage", //售货机管理
					defaultShow : true,
					order : 0,
					operation:["r","w"],
					url : ""
				},{
					name:"distribution_management",//配货管理
					defaultShow : true,
					order : 2,
					subApp : [ {
						name:"channel_manage",//货道管理
						defaultShow : true,
						order : 1,
						operation:["r","w"],
						url : ""
					},{
						name:"channelTemplate_manage",//货道模板
						defaultShow : true,
						order : 2,
						operation:["r","w"],
						url : ""
					}]
				},{
					name : "model_manage", //机型管理
					defaultShow : true,
					order : 1,
					operation:["r","w"],
					url : ""
				},{
					name:"inbox",//工控机
					defaultShow : true,
					order : 3,
					subApp : [
                    {
						name : "upgrade",     //远程升级
						order : 0,
						defaultShow : true,
						operation:["r","w"],
						url : "."
					}, {                              
						name : "inbox_manage",     //远程控制
						order : 1,
						defaultShow : true,
						operation:["r"],
						url : ""
					},{                             
						name : "online_statistics",     //在线统计
						order : 2,
						defaultShow : true,
						operation:["r"],
						url : ""
					},{
						name : "flow_statistics",     //流量统计
						order : 3,
						defaultShow : true,
						operation:["r"],
						url : ""
				   },{
					name : "signal_statistics",     //信号统计
					order : 4,
					defaultShow : true,
					operation:["r"],
					url : ""
				}]
			  }]
			}]
		};
	
	var appConfig = {
		modules : [ point,smartVm]
	}

	return appConfig;
})