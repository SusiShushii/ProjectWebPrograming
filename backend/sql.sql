CREATE DATABASE IF NOT EXISTS Popmart;

USE popmart;
SHOW TABLES;
SELECT * FROM popmart.useraccount;

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
	Username varchar(50),
    Password varchar(50),
    FirstName varchar (50),
    Lastname varchar(50)
	);
Create TABLE IF NOT EXISTS Product(
	productid int primary key,
    pname varchar(45),
    pprice int,
    ptype varchar(15),
    psize int,
    pmaterial varchar(15)
    );
    
DROP TABLE Product;

INSERT INTO useraccount (userid, email, password, fname, lname, phonenum, sex) 
VALUES (1,'email@gmail.com','testpass','firstna','lastna','0487','Male');

