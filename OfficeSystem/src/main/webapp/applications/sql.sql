/*alter table GoodsType add column typeOrder varchar(50);*/

CREATE DATABASE shiguo_wechat DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

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