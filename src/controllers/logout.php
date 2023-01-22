<?php
    ob_clean();
    session_start();
    
    unset($_SESSION["valid"]);
    unset($_SESSION["username"]);
   
    echo '../../public/login.html';
?>
