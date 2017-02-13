define(function(require) {
    var cloud = require("cloud/base/cloud");
    require("cloud/lib/plugin/jquery.datetimepicker");
    require("cloud/lib/plugin/jquery-ui");
    require("cloud/resources/css/jquery-ui.css");
    require("cloud/resources/css/jquery.multiselect.css");
    require("./css/style.css");
    
    var Service = require("./service");
    var Button = require("cloud/components/button");
    var NoticeBar = Class.create(cloud.Component, {
        initialize: function($super, options) {
            $super(options);
            this._render();
        },
        _render: function() {
            this.draw();
        },
        draw: function() {
            var self = this; 
            var $htmls = $(+"<div></div>" +
        	        "<div style='margin-top: 5px;margin-bottom: 5px;height: 20px;' id='search'>" +
        	        "<div style='float:left;margin-left: 2%;'>" +
	                    "<select id='reportType'  name='reportType' style='width:100px;height: 28px;'>" +
		                    "<option value='1' selected = 'selected'>日</option>" +
                            "<option value='2'>月</option>" +
		                    "<option value='3'>年</option>" +
	                    "</select>&nbsp;&nbsp;" +
                    "</div>" +
                    "<div style='float:left;height: 28px;'>" +
                    	"<input style='width:120px;height: 28px;' class='notice-bar-calendar-input datepicker' type='text' readonly='readonly' id='summary_date' />&nbsp;&nbsp;" +
                    "</div>" +
                    "<div style='float:left;height: 28px;margin-left:-10px;'>" +
                    	"<input style='width:120px;height: 28px;display:none;' class='notice-bar-calendar-input datepicker' type='text' readonly='readonly' id='summary_month'/>&nbsp;&nbsp;" +
                    "</div>" +
		            "<div style='float:left;height: 28px;'>" +
		            	"<input style='width:120px;height: 28px;display:none;' class='notice-bar-calendar-input datepicker' type='text' readonly='readonly' id='summary_startTime' />" +
                    "</div>&nbsp;&nbsp;" +
                    "<div style='float:left;height: 28px;margin-left: 5px;'>" +
	                	"<input style='width:120px;height: 28px;display:none;' class='notice-bar-calendar-input datepicker' type='text' readonly='readonly' id='summary_endTime'/>" +
	                "</div>" +
	                "<div style='float:left;height: 28px;margin-left:5px;margin-right: 30px;'>" +
		                "<select id='summary_year' style='height: 28px;display:none; border-radius: 4px;'>" +
		                      "<option value='2017' selected='selected'>2017</option>" +
		                      "<option value='2018'>2018</option>" +
		                      "<option value='2019'>2019</option>" +
		                      "<option value='2020'>2020</option>" +
		                      "<option value='2021'>2021</option>" +
		                      "<option value='2022'>2022</option>" +
		                      "<option value='2023'>2023</option>" +
		                      "<option value='2024'>2024</option>" +
		                      "<option value='2025'>2025</option>" +
		                      "<option value='2026'>2026</option>" +
		                      "<option value='2027'>2027</option>" +
                              "<option value='2028'>2028</option>" +
		                "</select>" +
	                "</div>" +
	                "<div id='buttonDiv' style='float:left;height: 28px;margin-left:5px;'></div>" +
		          "</div>");
            this.element.append($htmls);
           
            $("#summary_month").val("");
            $("#summary_year").val("");
            this._renderBar();
            this._renderSelect();
            this._renderBtn();
        },
       
        _renderBar: function() {
            var self = this;
            $("#reportType").bind('change', function() {
                var selectedId = $("#reportType").find("option:selected").val();
                if (selectedId == "1") {
                    $("#summary_month").css("display", "none");
                    $("#summary_year").css("display", "none");
                    $("#summary_date").css("display", "block");
                    $("#summary_startTime").css("display", "none");
                    $("#summary_endTime").css("display", "none");
                    $("#summary_year").val("");
                    $("#summary_month").val("");
                    $("#summary_date").val(cloud.util.dateFormat(new Date(((new Date()).getTime()) / 1000), "yyyy/MM/dd"));
                } else if (selectedId == "2") {
                    $("#summary_date").css("display", "none");
                    $("#summary_year").css("display", "none");
                    $("#summary_month").css("display", "block");
                    $("#summary_startTime").css("display", "none");
                    $("#summary_endTime").css("display", "none");
                    $("#summary_date").val("");
                    $("#summary_year").val("");
                    $("#summary_month").val(cloud.util.dateFormat(new Date(((new Date()).getTime()) / 1000), "yyyy/MM"));
                     
                } else if (selectedId == "3") {
                    $("#summary_date").css("display", "none");
                    $("#summary_month").css("display", "none");
                    $("#summary_year").css("display", "block");
                    $("#summary_startTime").css("display", "none");
                    $("#summary_endTime").css("display", "none");
                    $("#summary_date").val("");
                    $("#summary_month").val("");
                }
            });
        },
        _renderSelect: function() {
            $(function() {
                $("#summary_date").val(cloud.util.dateFormat(new Date(((new Date()).getTime()) / 1000), "yyyy/MM/dd")).datetimepicker({
                    format: 'Y/m/d',
                    step: 1,
                    startDate: '-1970/01/08',
                    lang: locale.current() === 1 ? "en" : "ch",
                    timepicker: false,
                    onShow: function() {
                        $(".xdsoft_calendar").show();
                    },
                    onChangeMonth: function(a, b) {
                        var date = new Date(new Date(a).getTime() / 1000);
                        b.val(cloud.util.dateFormat(date, "yyyy/MM/dd"));
                    },
                    onClose: function(a, b) {
                        var date = new Date(new Date(a).getTime() / 1000);
                        b.val(cloud.util.dateFormat(date, "yyyy/MM/dd"));
                    },
                })

                $("#summary_month").val(cloud.util.dateFormat(new Date(((new Date()).getTime()) / 1000), "yyyy/MM")).datetimepicker({
                    timepicker: false,
                    format: 'Y/m',
                    onShow: function() {
                        $(".xdsoft_calendar").hide();
                    },
                    onChangeMonth: function(a, b) {
                        var date = new Date(new Date(a).getTime() / 1000);
                        b.val(cloud.util.dateFormat(date, "yyyy/MM"));
                    },
                    onClose: function(a, b) {
                        var date = new Date(new Date(a).getTime() / 1000);
                        b.val(cloud.util.dateFormat(date, "yyyy/MM"));
                    },
                    lang: locale.current() === 1 ? "en" : "ch"
                })
                $("#summary_startTime").val(cloud.util.dateFormat(new Date(((new Date()).getTime()) / 1000 - (1 * 30 * 24 * 60 * 60)), "yyyy/MM/dd")).datetimepicker({
					format:'Y/m/d',
					step:1,
					startDate:'-1970/01/08',
					timepicker: false,
					lang:locale.current() === 1 ? "en" : "ch",
				//	timepicker: true,
			        onShow: function() {
			            // $(".xdsoft_calendar").hide();
                    $(".xdsoft_calendar").show();
			        },
			        onChangeMonth: function(a, b) {
			            var date = new Date(new Date(a).getTime() / 1000);
                     b.val(cloud.util.dateFormat(date, "yyyy/MM/dd"));
			           // b.val(cloud.util.dateFormat(date, "yyyy/MM hh:mm"));
			        },
			        onClose: function(a, b) {
			            var date = new Date(new Date($("#summary_startTime").val()).getTime() / 1000);
			            b.val(cloud.util.dateFormat(date, "yyyy/MM/dd"));
			        }

							
				})
				 $("#summary_endTime").val(cloud.util.dateFormat(new Date(((new Date()).getTime()) / 1000), "yyyy/MM/dd")).datetimepicker({
					format:'Y/m/d',
					step:1,
					startDate:'-1970/01/08',
					timepicker: false,
					lang:locale.current() === 1 ? "en" : "ch",
				//	timepicker: true,
					onShow: function() {
					     // $(".xdsoft_calendar").hide();
               $(".xdsoft_calendar").show();
					},
					onChangeMonth: function(a, b) {
					     var date = new Date(new Date(a).getTime() / 1000);
               b.val(cloud.util.dateFormat(date, "yyyy/MM/dd"));
					   //  b.val(cloud.util.dateFormat(date, "yyyy/MM hh:mm"));
					},
					onClose: function(a, b) {
					     var date = new Date(new Date($("#summary_endTime").val()).getTime() / 1000);
					     b.val(cloud.util.dateFormat(date, "yyyy/MM/dd"));
					}
				})
            });
        },
        _renderBtn: function() {
            var self = this;
            //查询
            var queryBtn = new Button({
                text: "查询",
                container: $("#buttonDiv"),
                events: {
                    click: function() {
                    	self.fire("query");
                    }
                }
            });
            $("#"+queryBtn.id).addClass("readClass");
            
        }

    });
    return NoticeBar;
});
