<?php
require '../config/db.php';
if ($_SERVER['REQUEST_METHOD'] === "GET") {
    echo "YES";
}

function database(): PDO {
    echo "here";
    static $pdo;

    if (!$pdo) {
        $pdo = new PDO(sprintf("pgsql:host=%s;dbname=%s",DB_HOST,DB_NAME),DB_USER,DB_PASSWORD);
        $u = $pdo->query("select user_id from users")->fetch();
        echo $u[0];
        return $pdo;
    }
    echo "here";
    // echo $pdo->query("select * from users")->fetch();

    return $pdo;
}

database();
