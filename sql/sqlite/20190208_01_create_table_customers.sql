create table customers
(
    customer_id integer not null
        constraint customers_pk
            primary key autoincrement,
    customer_name nvarchar(100) not null,
    customer_phone varchar(20),
    customer_email varchar(250)
);
