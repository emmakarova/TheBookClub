<?php

    const USERNAME_PARAM = 'username';
    const PASSWORD_PARAM = 'password';

    const GET_USER_PASSWORD = 'SELECT user_id, password FROM users WHERE username = :username';
    const GET_USER_USERNAME = 'SELECT username FROM users WHERE username = :username';
    const INSERT_USER = 'INSERT INTO users (username, password) VALUES (:username, :password)';

    const GET_ALL_RESOURCES = 'SELECT resource_id,title, author, times_read, max_reading_days FROM resources';

    const INSERT_RESOURCES_TAKEN = 'INSERT INTO resources_taken (resource_id, user_id) VALUES (:resource_id, :user_id)';
?>
