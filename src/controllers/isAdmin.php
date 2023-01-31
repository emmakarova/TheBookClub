<?php
    ob_clean();
    session_start();

    if ($_SERVER["REQUEST_METHOD"] != "GET") {
        http_response_code(400);
        exit('<p class="error">Unexpected call!</p>');
    }

    $isAdmin = isset($_SESSION['admin_rights']) && $_SESSION['admin_rights'];
    echo $isAdmin;
?>
