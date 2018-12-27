create table services
(
	service_id integer not null
		constraint services_pk
			primary key autoincrement,
	service_name nvarchar(100) not null,
	service_description nvarchar(500),
	service_group_id integer
		constraint services_service_groups_service_group_id_fk
			references service_groups (service_group_id)
)
