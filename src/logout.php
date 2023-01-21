<?php
    session_start();
    unset($_SESSION["valid"]);
    unset($_SESSION["username"]);
   
    echo 'You have cleaned session';

    ob_start(); 
    header('Refresh: 1; URL = ../login.html');
    ob_end_flush(); 
?>
