USE team12;
SHOW TABLES;

SELECT * FROM product;
SELECT * FROM useraccount;
SELECT * FROM adminaccount;
CREATE TABLE IF NOT EXISTS useraccount(	
    userid int primary key,
    email varchar(255),
    password varchar(255),
    fname varchar(255),
    lname varchar(255),
    phonenum varchar(10),
    sex varchar(10)
    );
Create TABLE IF NOT EXISTS adminaccount(
	email varchar(255),
    password varchar(255),
    fname varchar (255)
	);
Create TABLE IF NOT EXISTS product(
	productid int primary key,
	image varchar(255),
    pname varchar(255),
    price varchar(255),
    brand varchar(255),
    size varchar(255),
    material varchar(255),
    isnew bool
    );