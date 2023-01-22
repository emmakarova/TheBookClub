-- Tables

insert into users(username, password) values('emmchi', 'bademmchi');
insert into users(username, password) values('magiC', 'mmollova');

insert into resources(link, title, author, max_readers, max_reading_days)
	values ('https://chitanka.info/book/6330-kradetsyt-na-knigi', 'Kradetsyt na knigi', 'Markus Zusak', 3, 10),
		   ('https://chitanka.info/book/2165-da-ubiesh-prismehulnik', 'Da ubiesh prismehulnik', 'Harper Lee', 5, 15);

insert into resources_taken(resource_id, user_id) values (1, 2);
insert into resources_taken(resource_id, user_id) values (2, 1);

insert into resources_taken(resource_id, user_id) values (1, 1);
insert into resources_taken(resource_id, user_id) values (2, 2);

insert into resources_taken(resource_id, user_id) values (3, 2);

delete from resources_taken
where resource_id = 1 and user_id = 2;

select * from users;
select * from resources;
select * from resources_taken;

show tables;


-- Triggers

show triggers;


-- Scheduler

show processlist;
