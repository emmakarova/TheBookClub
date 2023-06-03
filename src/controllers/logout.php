<?php
    ob_clean();
    session_start();

    if ($_SERVER["REQUEST_METHOD"] != "POST") {
        http_response_code(400);
        exit('Unexpected call!');
    }

    unset($_SESSION["valid"]);
    unset($_SESSION["username"]);
    unset($_SESSION["user_id"]);
    session_destroy();
   
    echo '../public/login.html';
?>
