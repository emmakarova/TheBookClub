<?php
    require_once "./connect.php";
    require_once "../globals/queries.php";

    ob_clean();
    session_start();

    if ($_SERVER["REQUEST_METHOD"] != "POST") {
        http_response_code(400);
        exit('<p class="error">Unexpected call!</p>');
    }

    $username = $_POST['username'];
    $password = $_POST['password'];

    $query = $db->prepare(GET_USER_PASSWORD);
    if (!$query) {
        http_response_code(500);
        exit('Error preparing the statement.');
    }

    $query->bindParam(USERNAME_PARAM, $username, PDO::PARAM_STR);
    if (!$query->execute()) {
        http_response_code(500);
        exit('<p class="error">Something went wrong!</p>');
    }

    $result = $query->fetchAll();
    $encryptedPassword = $result[0]['password'];

    if (!password_verify($password, $encryptedPassword)) {
        http_response_code(403);
        exit('<p class="error">Wrong password!</p>');
    }

    $_SESSION['valid'] = true;
    $_SESSION['username'] = $username;

    echo '../../public/homepage.html';
    exit();
?>
