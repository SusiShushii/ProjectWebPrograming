CREATE DATABASE IF NOT EXISTS Popmart;

USE popmart;
SHOW TABLES;

CREATE TABLE IF NOT EXISTS UserAccount(	
    userid int primary key,
    email varchar(255),
    password varchar(255),
    fname varchar(50),
    lname varchar(45),
    phonenum varchar(10),
    sex varchar(10)
    );
Create TABLE IF NOT EXISTS AdminAccount(
	email varchar(255),
    password varchar(255),
    fname varchar (255)
	);
    
Create TABLE IF NOT EXISTS Product(
	productid int primary key,
    image varchar(255),
    pname varchar(255),
    price varchar(255),
    brand varchar(255),
    size varchar(255),
    material varchar(255),
    isnew boolean
    );
    
SELECT * FROM useraccount;
SELECT * FROM product;
SELECT * FROM adminaccount;