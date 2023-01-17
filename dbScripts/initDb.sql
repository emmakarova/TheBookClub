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
	resource_id int not null, 
	user_id int not null,
	date_taken timestamp not null,
	primary key (resource_id, user_id),
	constraint fk_resource foreign key (resource_id) references resources(resource_id),
	constraint fk_user foreign key (user_id) references users(user_id)
);

create table rates (
	resource_id int not null,
	user_id int not null, 
	rate int not null check (rate >= 1 and rate <= 10),
	primary key (resource_id, user_id),
	constraint fk_resource foreign key (resource_id) references resources(resource_id),
	constraint fk_user foreign key (user_id) references users(user_id)
);

-- drop table if exists users cascade;
-- drop table if exists resources cascade;
-- drop table if exists resources_taken cascade;
-- drop table if exists rates cascade;


create function increase_readers() 
returns trigger as $increase_readers$
begin
	-- RAISE NOTICE 'i want to print %', new.resource_id;
	update resources 
	set times_read = times_read + 1,
		current_readers = current_readers + 1
	where resources.resource_id = new.resource_id;
	return null;
end;
$increase_readers$ language plpgsql;

create trigger increase_readers
after insert on resources_taken
for each row execute procedure increase_readers();


create function decrease_current_readers() 
returns trigger as $decrease_current_readers$
begin
	-- RAISE NOTICE 'i want to print %', old.resource_id;
	update resources 
	set current_readers = current_readers - 1
	where resources.resource_id = old.resource_id;
	return null;
end;
$decrease_current_readers$ language plpgsql;

create trigger decrease_current_readers 
after delete on resources_taken
for each row execute procedure decrease_current_readers();


-- drop trigger if exists increase_readers on resources_taken;
-- drop function if exists increase_readers;

-- drop trigger if exists decrease_current_readers on resources_taken;
-- drop function if exists decrease_current_readers;
