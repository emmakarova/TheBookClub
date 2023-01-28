<?php
    const USER_ID_PARAM = 'userId';
    const USERNAME_PARAM = 'username';
    const PASSWORD_PARAM = 'password';
    const RESOURCE_ID_PARAM = 'resourceId';
    const RATE_PARAM = 'rate';

    const GET_USER_PASSWORD = 'SELECT user_id,password FROM users WHERE username = :username';
    const GET_USER_USERNAME = 'SELECT username FROM users WHERE username = :username';
    const INSERT_USER = 'INSERT INTO users (username, password) VALUES (:username, :password)';
    const INSERT_RESOURCES_TAKEN = 'INSERT INTO resources_taken (resource_id, user_id) VALUES (:resource_id, :user_id)';

    const GET_ALL_RESOURCES = 'SELECT resource_id, title, author, times_read, max_reading_days FROM resources';

    const GET_USER_ID = 'SELECT user_id FROM users WHERE username = :username';
    const GET_CURRENTLY_READING = 'SELECT resources.resource_id, title, author, date(resources_taken.date_to_return) as date, AVG(rate) as rate
                                   FROM resources 
                                   JOIN resources_taken ON resources.resource_id = resources_taken.resource_id
                                   LEFT JOIN rates ON rates.resource_id = resources_taken.resource_id
                                   WHERE resources_taken.user_id = :userId
                                   GROUP BY resources.resource_id';
    const RETURN_RESOURCE = 'DELETE FROM resources_taken WHERE resource_id = :resourceId AND user_id = :userId';
    const ADD_RATE = 'INSERT INTO rates(resource_id, user_id, rate) VALUES (:resourceId, :userId, :rate)';
?>
