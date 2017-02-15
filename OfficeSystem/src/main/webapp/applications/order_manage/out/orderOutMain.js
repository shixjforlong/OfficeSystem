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
          var areaMan_Array = ["goods_out"];
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
                        if (id == "take_order") {//接单
                             if (this.area_listPage) {
                                this.area_listPage.destroy();
                             }
                             this.area_listPage = new area_Mg({
                                "container": ".main_bd",
                                state:"0"
                             });
                         }else if (id == "goods_out") {//商品配送
                             if (this.order_listPage) {
                                 this.order_listPage.destroy();
                              }
                              this.order_listPage = new area_Mg({
                                 "container": ".main_bd",
                                 state:"1"
                              });
                          }else if (id == "order_finish") {//订单完成
                              if (this.finish_listPage) {
                                  this.finish_listPage.destroy();
                               }
                               this.finish_listPage = new area_Mg({
                                  "container": ".main_bd",
                                  state:"2"
                               });
                           }
                    }
               }
            });
            $("#goods_out").click();
        }
    });
    return operationMenu;
});