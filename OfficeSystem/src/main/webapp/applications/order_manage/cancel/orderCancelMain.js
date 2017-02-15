define(function(require) {
    require("cloud/base/cloud");
    require("cloud/lib/plugin/jquery.dataTables");
    var Table = require("../../template/tableTemplate");
    var html = require("text!./orderTakeMain.html");
    var statusMg = require("../../template/menu");
    var area_Mg = require("../taking/list");
    var operationMenu = Class.create(cloud.Component, {
        initialize: function($super, options) {
            $super(options);
            this.service = options.service;
            this.element.html(html);
            this.elements = {
                conent_el: "content-operation-menu"
            };
            this._render();
            locale.render({element: this.element});

        },
        _render: function() {
        	var height = $(window).height(); //浏览器当前窗口可视区域高度 
        	var headHeight = $(".navbar-header").height();
        	$("#content-operation-menu").height(height -headHeight);
        	$("#content-operation-menu").css("margin-top","-7px");
            this.renderContent();
            
        },
        renderContent: function() {
          var areaMan_Array = ["order_cancels"];
          if (this.statusMg) {
             this.statusMg.destroy();
          }
          this.statusMg = new statusMg({
        	  "container": "#col_slide_main",
              "lis": areaMan_Array,
              "events": {
                   click: function(id) {
                        $(".main_bd").empty();
                        $("#user-content").scrollTop(0);
                        if (id == "order_cancels") {
                             if (this.area_listPage) {
                                this.area_listPage.destroy();
                             }
                             this.area_listPage = new area_Mg({
                                "container": ".main_bd",
                                state:"4"
                             });
                         }
                    }
               }
            });
            $("#order_cancels").click();
        }
    });
    return operationMenu;
});