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
    const NOTIFICATION_ID_PARAM = 'notificationId';
    const ADMIN_RIGHTS_PARAM = 'adminRights';

    const GET_USER_PASSWORD = 'SELECT admin_rights, user_id, password FROM users WHERE username = :username';
    const GET_USER_USERNAME = 'SELECT username FROM users WHERE username = :username';

    const INSERT_RESOURCES_TAKEN = 'INSERT INTO resources_taken (resource_id, user_id) VALUES (:resource_id, :user_id)';
    const INSERT_USER = 'INSERT INTO users (username, password, names, admin_rights) VALUES (:username, :password, :names, :adminRights)';


    const GET_ALL_RESOURCES = 'SELECT resources.resource_id, link, title, max_readers, max_reading_days,author,times_read, AVG(rate) as rate
                               FROM resources
                               LEFT JOIN rates ON rates.resource_id = resources.resource_id
                               GROUP BY resources.resource_id';
    const GET_ALL_RESOURCES_BY_USER = 'SELECT * 
                                       FROM resources
                                       LEFT JOIN resources_taken rt on resources.resource_id = rt.resource_id 
                                       WHERE rt.user_id = :user_id';

    const GET_CURRENTLY_READING = 'SELECT resources.resource_id, title, author, link, date(resources_taken.date_to_return) as date, AVG(rate) as rate
                                   FROM resources 
                                   JOIN resources_taken ON resources.resource_id = resources_taken.resource_id
                                   LEFT JOIN rates ON rates.resource_id = resources_taken.resource_id
                                   WHERE resources_taken.user_id = :userId
                                   GROUP BY resources.resource_id';
    const RETURN_RESOURCE = 'DELETE FROM resources_taken WHERE resource_id = :resourceId AND user_id = :userId';
    const ADD_RATE = 'INSERT INTO rates(resource_id, user_id, rate) VALUES (:resourceId, :userId, :rate)';

    const UPLOAD_RESOURCE = 'INSERT INTO resources (uploaded_by, link, title, author, max_readers, max_reading_days)
	                         VALUES (:userId, :link, :title, :author, :maxReaders, :maxDays)';

    const GET_PROFILE_INFO = 'SELECT username, names, admin_rights FROM users WHERE user_id = :userId';
    const GET_MY_RESOURCES = 'SELECT resource_id, title, author, link, times_read FROM resources
                              WHERE uploaded_by = :userId';
    const DELETE_RESOURCE = 'DELETE FROM resources WHERE resource_id = :resourceId';

    const GET_NOTIFICATIONS = 'SELECT notification_id, date(received_at) as received_at, message, seen FROM notifications
                               WHERE user_id = :userId';
    const MARK_NOTIFICATION_AS_READ = 'UPDATE notifications SET seen = true WHERE notification_id = :notificationId';
?>
