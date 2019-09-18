create table specialists
(
    specialist_id integer not null
        constraint specialists_pk
            primary key autoincrement,
    specialist_first_name nvarchar(50) not null,
    specialist_last_name nvarchar(50),
    specialist_middle_name nvarchar(50)
)
