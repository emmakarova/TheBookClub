insert into users(username, password) values('emmchi', 'bademmchi');
insert into users(username, password) values('magiC', 'mmollova');

insert into resources(link, max_readers, max_reading_days)
	values ('https://chitanka.info/book/6330-kradetsyt-na-knigi', 3, 10),
		   ('https://chitanka.info/book/2165-da-ubiesh-prismehulnik', 5, 15);
		  
insert into resources_taken(resource_id, user_id, date_taken) 
	values (1, 2, localtimestamp);
insert into resources_taken(resource_id, user_id, date_taken) 
	values (2, 1, localtimestamp);

insert into resources_taken(resource_id, user_id, date_taken) 
	values (1, 1, localtimestamp);
insert into resources_taken(resource_id, user_id, date_taken) 
	values (2, 2, localtimestamp);

delete from resources_taken
where resource_id = 1 and user_id = 1;

select * from users;
select * from resources;
select * from resources_taken;