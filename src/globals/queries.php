<?php
    const USER_ID_PARAM = 'userId';
    const USERNAME_PARAM = 'username';
    const PASSWORD_PARAM = 'password';
    const NAMES_PARAM = 'names';
    const RESOURCE_ID_PARAM = 'resourceId';
    const RATE_PARAM = 'rate';
    const LINK_PARAM = 'link';
    const TITLE_PARAM = 'title';
    const AUTHOR_PARAM = 'author';
    const MAX_READERS_PARAM = 'maxReaders';
    const MAX_DAYS_PARAM = 'maxDays';

    const GET_USER_PASSWORD = 'SELECT password FROM users WHERE username = :username';
    const GET_USER_USERNAME = 'SELECT username FROM users WHERE username = :username';
    const INSERT_USER = 'INSERT INTO users (username, password, names) VALUES (:username, :password, :names)';

    const GET_ALL_RESOURCES = 'SELECT title, author, times_read, max_reading_days FROM resources';

    const GET_USER_ID = 'SELECT user_id FROM users WHERE username = :username';
    const GET_CURRENTLY_READING = 'SELECT resources.resource_id, title, author, date(resources_taken.date_to_return) as date, AVG(rate) as rate
                                   FROM resources 
                                   JOIN resources_taken ON resources.resource_id = resources_taken.resource_id
                                   LEFT JOIN rates ON rates.resource_id = resources_taken.resource_id
                                   WHERE resources_taken.user_id = :userId
                                   GROUP BY resources.resource_id';
    const RETURN_RESOURCE = 'DELETE FROM resources_taken WHERE resource_id = :resourceId AND user_id = :userId';
    const ADD_RATE = 'INSERT INTO rates(resource_id, user_id, rate) VALUES (:resourceId, :userId, :rate)';

    const UPLOAD_RESOURCE = 'INSERT INTO resources (link, title, author, max_readers, max_reading_days)
	                         VALUES (:link, :title, :author, :maxReaders, :maxDays)';
?>
