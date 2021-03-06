/*alter table GoodsType add column typeOrder varchar(50);*/

CREATE DATABASE shiguo_wechat DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

DROP TABLE IF EXISTS OrderStatistics;  
CREATE TABLE OrderStatistics (  
   id  int(11) NOT NULL AUTO_INCREMENT, 
   number  varchar(500) NOT NULL, 
   price  int(255),
   count int(255),
   statisticTime int(255),
   createTime int(255),
   updateTime int(255),
  PRIMARY KEY (id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8; 

DROP TABLE IF EXISTS OrderStatisticsM;  
CREATE TABLE OrderStatisticsM (  
   id  int(11) NOT NULL AUTO_INCREMENT, 
   number  varchar(500), 
   price  int(255),
   count int(255),
   statisticTime int(255),
   createTime int(255),
   updateTime int(255),
  PRIMARY KEY (id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8; 

DROP TABLE IF EXISTS OrderStatisticsY;  
CREATE TABLE OrderStatisticsY (  
   id  int(11) NOT NULL AUTO_INCREMENT,
   number  varchar(500), 
   price  int(255),
   count int(255),
   statisticTime int(255),
   createTime int(255),
   updateTime int(255),
  PRIMARY KEY (id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8; 

/*订单表*/
DROP TABLE IF EXISTS Orders;
CREATE TABLE Orders (  
   id  int(11) NOT NULL AUTO_INCREMENT,  
   openId varchar(500) NOT NULL,
   number  varchar(500), 
   receiveName  varchar(500), 
   receiveGender  varchar(500),
   receivePhone varchar(500),
   receiveAddress varchar(500), 
   serviceTime varchar(500),
   distributionCost varchar(500),
   getIntegral varchar(500),
   payState varchar(100),
   orderNo varchar(500),
   tradeNo varchar(500),
   goodsInfo  varchar(500),
   gtotalPrice int(255),
   integral int(255),
   empirical int(255),
   payPrice int(255),
   state varchar(100),
   payTime int(255),
   createTime int(255),
   traCreateTime int(255),
   refundTime int(255),
   refundOrderNo varchar(500),
   refundFee int(255),
   refundStatus int(255),
   refundTradeNo varchar(500),
   orderInTime int(255),
   orderOutTime int(255),
   orderFinishTime int(255),
   orderCancelTime int(255),
   reminderState varchar(500),
   reminderTime int(255),
   reminderReplyTime int(255),
   cancelState varchar(500),
   cancelStateTime int(255),
  PRIMARY KEY (id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;

/*商家信息表*/
DROP TABLE IF EXISTS Business;
CREATE TABLE Business (  
   id  int(11) NOT NULL AUTO_INCREMENT,  
   number  varchar(500) NOT NULL, 
   name  varchar(500) NOT NULL,
   phone varchar(500) NOT NULL,
   address varchar(500) NOT NULL,
   servicetime varchar(500) NOT NULL,
   service varchar(500) NOT NULL,
   activity varchar(500) NOT NULL,
   lat varchar(500) NOT NULL,
   lng varchar(500) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;

/*会员收货地址表*/
DROP TABLE IF EXISTS WXUserAddress;
CREATE TABLE WXUserAddress (  
   id  int(11) NOT NULL AUTO_INCREMENT,  
   receiveName  varchar(500) NOT NULL, 
   receiveGender  varchar(500) NOT NULL,
   receivePhone varchar(500) NOT NULL,
   receiveAddress varchar(500) NOT NULL,
   enabled varchar(500) NOT NULL,
   openId varchar(500) NOT NULL,
   number  varchar(500), 
  PRIMARY KEY (id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;

/*会员等级表*/
DROP TABLE IF EXISTS Vip;
CREATE TABLE Vip (  
   id  int(11) NOT NULL AUTO_INCREMENT,  
   levelName  varchar(500) NOT NULL, 
   empiricalU  bigint NOT NULL, 
   empiricalL bigint NOT NULL,
  PRIMARY KEY (id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;

/*微信用户信息表*/
DROP TABLE IF EXISTS WXUser;
CREATE TABLE WXUser (  
   id  int(11) NOT NULL AUTO_INCREMENT,  
   openId  varchar(500) NOT NULL, 
   nickName  varchar(500) NOT NULL, 
   image  varchar(500) NOT NULL,
   integration  bigint(20), 
   empirical bigint(20),
   levelId  varchar(500), 
   levelName  varchar(500),
  PRIMARY KEY (id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;

/*商品分类表*/
DROP TABLE IF EXISTS GoodsType;
CREATE TABLE GoodsType (  
   id  int(11) NOT NULL AUTO_INCREMENT,  
   name  varchar(500) NOT NULL, 
   descript  varchar(1000), 
   typeOrder varchar(50)
  PRIMARY KEY (id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;

/*商品表*/
DROP TABLE IF EXISTS Goods;
CREATE TABLE Goods (  
   id  int(11) NOT NULL AUTO_INCREMENT,  
   name  varchar(500) NOT NULL, 
   imageName varchar(5000) NOT NULL,
   typeID varchar(100) NOT NULL,
   typeName varchar(500) NOT NULL,
   price  int(100) NOT NULL,
   state varchar(100) NOT NULL,
   descript  varchar(1000), 
   specifications varchar(65530) NOT NULL, 
   createTime bigint NOT NULL,
   updateTime bigint NOT NULL,
  PRIMARY KEY (id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8; 

/*系统用户表*/
DROP TABLE IF EXISTS User;  
CREATE TABLE User (  
   id  int(11) NOT NULL AUTO_INCREMENT,  
   name  varchar(250) NOT NULL,  
   password varchar(300) NOT NULL,
   email    varchar(300),
   phone varchar(300),
   createTime bigint NOT NULL,
   updateTime bigint NOT NULL,
  PRIMARY KEY (id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;  