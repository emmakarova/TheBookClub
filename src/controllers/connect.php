<?php
    require '../../config/db.php';

    static $db;

    if (!$db) {
        $db = new PDO(sprintf("mysql:host=%s;dbname=%s",DB_HOST,DB_NAME),DB_USER,DB_PASSWORD);
    }
 
?>
