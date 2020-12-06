drop database if exists burgers_db;

create database burgers_db;

use burgers_db;

create table burgers (
    id int AUTO_INCREMENT,
    burger_name VARCHAR(50),
    devoured boolean,
    PRIMARY KEY (id)
    );