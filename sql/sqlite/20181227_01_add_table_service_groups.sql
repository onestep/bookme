create table service_groups
(
    service_group_id integer not null
        constraint service_groups_pk
            primary key autoincrement,
    service_group_name nvarchar(100) not null,
    service_group_description nvarchar(500),
    parent_service_group_id integer
        constraint service_groups_service_groups_service_group_id_fk
            references service_groups
)
