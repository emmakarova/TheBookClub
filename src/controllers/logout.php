<?php
    ob_clean();
    session_start();

    if ($_SERVER["REQUEST_METHOD"] != "POST") {
        http_response_code(400);
        exit('<p class="error">Unexpected call!</p>');
    }
    echo $_SESSION[0];
    unset($_SESSION["valid"]);
    unset($_SESSION["username"]);
   
    // echo '../../public/login.html';
?>
