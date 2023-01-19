<?php
require '../config/db.php';
if ($_SERVER['REQUEST_METHOD'] === "GET") {
    // echo "YES";
}

    static $db;

    if (!$db) {
        $db = new PDO(sprintf("pgsql:host=%s;dbname=%s",DB_HOST,DB_NAME),DB_USER,DB_PASSWORD);
        $u = $db->query("select user_id from users")->fetch();
        // echo $u[0];
    }
    // echo "heredd";
    // echo $pdo->query("select * from users")->fetch();
