<?php
    require_once "./connect.php";
    require_once "../globals/queries.php";

    if ($_SERVER["REQUEST_METHOD"] != "POST") {
        http_response_code(400);
        exit('Unsuccessful login! Try again!');
    }

    $firstName = $_POST['first-name'];
    $lastName = $_POST['last-name'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    $confirm_password = $_POST["confirm_password"];
    $admin_rights = false;

    if (isset($_POST['admin_rights']) && $_POST['admin_rights']) {
        $admin_rights = true;
    }

    $password_hash = password_hash($password, PASSWORD_BCRYPT);

    $query = $db->prepare(GET_USER_USERNAME);
    if (!$query) {
        http_response_code(500);
        exit('Unsuccessful login! Try again!');
    }

    $query->bindParam(USERNAME_PARAM, $username, PDO::PARAM_STR);
    if (!$query->execute()) {
        http_response_code(500);
        exit('Unsuccessful login! Try again!');
    }

    if ($query->rowCount() > 0) {
        http_response_code(409);
        exit('Това потребителско име вече е заето!');
    }

    if ($password != $confirm_password) {
        http_response_code(403);
        exit('Въведените пароли не съвпадат!');
    }
    
    $insertQuery = $db->prepare(INSERT_USER);
    if (!$insertQuery) {
        http_response_code(500);
        exit('Unsuccessful login! Try again!');
    }

    $names = $firstName . " " . $lastName;
    
    $insertQuery->bindParam(USERNAME_PARAM, $username, PDO::PARAM_STR);
    $insertQuery->bindParam(PASSWORD_PARAM, $password_hash, PDO::PARAM_STR);
    $insertQuery->bindParam(NAMES_PARAM, $names, PDO::PARAM_STR);
    $insertQuery->bindParam(ADMIN_RIGHTS_PARAM, $admin_rights, PDO::PARAM_INT);

    if (!$insertQuery->execute()) {
        http_response_code(500);
        exit('Unsuccessful login! Try again!');
    }

    if ($admin_rights) {
        echo "../public/adminHomepage.html";
    }
    else {
        echo '../public/login.html';
    }
?>
