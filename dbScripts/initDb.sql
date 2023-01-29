-- CREATE TABLE statements

create table users (
	user_id serial primary key, 
	username varchar (15) unique not null,
	password varchar (63) unique not null,
	names varchar (63) unique not null, 
	admin_rights bool not null default false
);

create table resources (
	resource_id serial primary key,
	uploaded_by bigint unsigned not null,
	title varchar (511) not null,
	author varchar (63) not null,
	link varchar (511) unique not null,
	max_readers int not null,
	current_readers int default 0,
	max_reading_days int not null,
	times_read int default 0,
	constraint fk_uploaded_by_user foreign key (uploaded_by) references users(user_id) on delete cascade
);

create table resources_taken (
	resource_id bigint unsigned not null, 
	user_id bigint unsigned not null,
	date_taken timestamp not null default now(),
	date_to_return timestamp,
	primary key (resource_id, user_id),
	constraint fk_resource_taken foreign key (resource_id) references resources(resource_id) on delete cascade,
	constraint fk_user_taken foreign key (user_id) references users(user_id) on delete cascade
);

create table rates (
	resource_id bigint unsigned not null,
	user_id bigint unsigned not null, 
	rate int not null check (rate >= 1 and rate <= 5),
	primary key (resource_id, user_id),
	constraint fk_resource_rate foreign key (resource_id) references resources(resource_id) on delete cascade,
	constraint fk_user_rate foreign key (user_id) references users(user_id) on delete cascade
);

create table notifications (
	notification_id serial primary key,
	user_id bigint unsigned not null,
	notification varchar(1023) not null,
	seen bool not null default false,
	received_at timestamp not null default now(),
	constraint fk_notified_user foreign key (user_id) references users(user_id) on delete cascade
);


-- alter table resources drop foreign key fk_uploaded_by_user;
-- alter table resources_taken drop foreign key fk_resource_taken;
-- alter table resources_taken drop foreign key fk_user_taken;
-- alter table rates drop foreign key fk_resource_rate;
-- alter table rates drop foreign key fk_user_rate;
-- alter table notifications drop foreign key fk_notified_user;

-- drop table if exists users cascade;
-- drop table if exists resources cascade;
-- drop table if exists resources_taken cascade;
-- drop table if exists rates cascade;
-- drop table if exists notifications cascade;


-- TRIGGERS

create trigger increase_readers
after insert on resources_taken
for each row
	update resources
	set times_read = times_read + 1,
		current_readers = current_readers + 1
	where resource_id = new.resource_id;

create trigger decrease_current_readers 
after delete on resources_taken
for each row
	update resources 
	set current_readers = current_readers - 1
	where resources.resource_id = old.resource_id;


create trigger add_date_to_return 
before insert on resources_taken
for each row
	set new.date_to_return = 
		(new.date_taken + 
			interval (select max_reading_days
					  from resources 
					  where resource_id = new.resource_id) day);
					 
create trigger notify_for_deleted_resource
before delete on resources
for each row
	insert into notifications(user_id, notification)
	(select user_id, concat('The resource "', old.title, '" you have been reading is deleted.') from resources_taken
	 where resources_taken.resource_id = old.resource_id);


-- drop trigger if exists increase_readers;
-- drop trigger if exists decrease_current_readers;
-- drop trigger if exists add_date_to_return;
-- drop trigger if exists notify_for_deleted_resource;


-- SCHEDULER
	
set global event_scheduler = on;

create event clean_up_expired_resources
on schedule every 1 minute
starts current_timestamp
ends current_timestamp + interval 1 year
do
	delete from resources_taken
	where date_to_return < now();

-- drop event clean_up_expired_resources;
