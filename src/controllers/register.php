<?php

    require_once "./connect.php";
    require_once "../globals/queries.php";

    if (!$_POST) {
        http_response_code(400);
        exit('<p class="error">Unexpected call!</p>');
    }

    $username = $_POST['username'];
    $password = $_POST['password'];
    $confirm_password = $_POST["confirm_password"];

    $password_hash = password_hash($password, PASSWORD_BCRYPT);

    $query = $db->prepare(GET_USER_USERNAME);
    if (!$query) {
        http_response_code(500);
        exit("Error preparing the statement.");
    }

    $query->bindParam(USERNAME_PARAM, $username, PDO::PARAM_STR);
    if (!$query->execute()) {
        http_response_code(500);
        exit('<p class="error">Something went wrong!</p>');
    }

    if ($query->rowCount() > 0) {
        http_response_code(409);
        exit('<p class="error">This username is already used!</p>');
    }

    if ($password != $confirm_password) {
        http_response_code(403);
        exit('<p class="error">Passwords did not match.</p>');
    }
    $insertQuery = $db->prepare(INSERT_USER);
    if (!$insertQuery) {
        http_response_code(500);
        exit("Error preparing the statement.");
    }

    $insertQuery->bindParam(USERNAME_PARAM, $username, PDO::PARAM_STR);
    $insertQuery->bindParam(PASSWORD_PARAM, $password_hash, PDO::PARAM_STR);

    if (!$insertQuery->execute()) {
        http_response_code(500);
        exit('<p class="error">Something went wrong!</p>');
    }

    echo '../../public/login.html';
    exit();
?>
