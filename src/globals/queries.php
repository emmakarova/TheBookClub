<?php

    const USERNAME_PARAM = 'username';
    const PASSWORD_PARAM = 'password';

    const GET_USER_PASSWORD = 'SELECT password FROM users WHERE username = :username';
    const GET_USER_USERNAME = 'SELECT username FROM users WHERE username = :username';
    const INSERT_USER = 'INSERT INTO users (username, password) VALUES (:username, :password)';

    const GET_ALL_RESOURCES = 'SELECT title, author, times_read, max_reading_days FROM resources';
?>
