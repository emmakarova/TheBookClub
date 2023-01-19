-- CREATE TABLE statements

create table users (
	user_id serial primary key, 
	username varchar (15) unique not null,
	password varchar (20) unique not null
);

create table resources (
	resource_id serial primary key,
	link varchar (511) unique not null,
	max_readers int not null,
	current_readers int default 0,
	max_reading_days int not null,
	times_read int default 0
);

create table resources_taken (
	resource_id bigint unsigned not null, 
	user_id bigint unsigned not null,
	date_taken timestamp not null default now(),
	date_to_return timestamp,
	primary key (resource_id, user_id),
	constraint fk_resource_taken foreign key (resource_id) references resources(resource_id),
	constraint fk_user_taken foreign key (user_id) references users(user_id)
);

create table rates (
	resource_id bigint unsigned not null,
	user_id bigint unsigned not null, 
	rate int not null check (rate >= 1 and rate <= 10),
	primary key (resource_id, user_id),
	constraint fk_resource_rate foreign key (resource_id) references resources(resource_id),
	constraint fk_user_rate foreign key (user_id) references users(user_id)
);

-- alter table resources_taken drop foreign key fk_resource_taken;
-- alter table resources_taken drop foreign key fk_user_taken;
-- alter table rates drop foreign key fk_resource_rate;
-- alter table rates drop foreign key fk_user_rate;

-- drop table if exists users cascade;
-- drop table if exists resources cascade;
-- drop table if exists resources_taken cascade;
-- drop table if exists rates cascade;


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
	

-- drop trigger if exists increase_readers;
-- drop trigger if exists decrease_current_readers;
-- drop trigger if exists add_date_to_return;


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
