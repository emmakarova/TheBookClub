<?php
    require_once "./connect.php";
    require_once "../globals/queries.php";

    ob_clean();
    session_start();

    if ($_SERVER["REQUEST_METHOD"] != "POST") {
        http_response_code(400);
        exit('Неуспешен вход! Опитай пак!');
    }

    $username = $_POST['username'];
    $password = $_POST['password'];

    $query = $db->prepare(GET_USER_PASSWORD);
    if (!$query) {
        http_response_code(500);
        exit('Неуспешен вход! Опитай пак!');
    }

    $query->bindParam(USERNAME_PARAM, $username, PDO::PARAM_STR);
    if (!$query->execute()) {
        http_response_code(500);
        exit('Неуспешен вход! Опитай пак!');
    }

    $result = $query->fetchAll();
    if (count($result) == 0) {
        http_response_code(405);
        exit('Не съществува такова потребителско име!');
    }

    $encryptedPassword = $result[0]['password'];

    if (!password_verify($password, $encryptedPassword)) {
        http_response_code(403);
        exit('Грешна парола!');
    }

    $_SESSION['valid'] = true;
    $_SESSION['username'] = $username;
    $_SESSION['user_id'] = $result[0]['user_id'];
    
    if ($result[0]['admin_rights']) {
        $_SESSION['admin_rights'] = true;
        echo '../public/adminHomepage.html';
    } else {
        $_SESSION['admin_rights'] = false;
        echo '../public/homepage.html';
    }

    exit();
?>
