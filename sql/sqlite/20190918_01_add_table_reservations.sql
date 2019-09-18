create table reservations
(
    reservation_id integer not null
        constraint reservations_pk
            primary key autoincrement,
    service_id integer not null
        constraint reservations_services_service_id_fk
            references services (service_id),
    specialist_id integer not null
        constraint reservations_specialists_specialist_id_fk
            references specialists (specialist_id),
    reservation_from_datetime datetime not null,
    reservation_to_datetime datetime not null
)
