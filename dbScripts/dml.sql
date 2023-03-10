-- Tables

insert into users(username, password) values('emmchi', 'bademmchi');
insert into users(username, password, names) values('emmchi', 'bademmchi', 'Emmchi Bademmchi');
insert into users(username, password, names, admin_rights) values('magiC', 'mmollova', 'MagiC Mollova', true);

insert into resources(uploaded_by, link, title, author, max_readers, max_reading_days)
	values (2, 'https://chitanka.info/book/6330-kradetsyt-na-knigi', 'Kradetsyt na knigi', 'Markus Zusak', 3, 10),
		   (2, 'https://chitanka.info/book/2165-da-ubiesh-prismehulnik', 'Da ubiesh prismehulnik', 'Harper Lee', 5, 15);
  
insert into resources_taken(resource_id, user_id) values (1, 2);
insert into resources_taken(resource_id, user_id) values (2, 1);

insert into resources_taken(resource_id, user_id) values (1, 1);
insert into resources_taken(resource_id, user_id) values (2, 2);

insert into rates(resource_id, user_id, rate) values (1, 1, 5);
insert into rates(resource_id, user_id, rate) values (2, 2, 4);


delete from resources_taken
where resource_id = 2 and user_id = 2;

delete from resources where resource_id > 2;

delete from resources_taken;

delete from resources where resource_id = 2;

select * from users;
select * from resources;
select * from resources_taken;
select * from rates;
select * from notifications;

show tables;


-- Triggers

show triggers;


-- Scheduler

show processlist;
