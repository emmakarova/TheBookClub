<?php
    require_once "./connect.php";
    require_once "../globals/queries.php";

    session_start();

    // check if authorized
    if (!isset($_SESSION["valid"])) {
        http_response_code(401);
        exit('Зло куче!');
    }

    if ($_SERVER["REQUEST_METHOD"] != "POST") {
        http_response_code(400);
        exit('Неуспешно влизане! Опитай пак!');
    }

    $userId = $_SESSION["user_id"];

    // upload the resource
    $link = $_POST['link'];
    $title = $_POST['title'];
    $author = $_POST['author'];
    $maxReaders = $_POST['max-readers'];
    $maxDays = $_POST['max-days'];

    $insertQuery = $db->prepare(UPLOAD_RESOURCE);
    if (!$insertQuery) {
        http_response_code(500);
        exit('Неуспешно добавяне на ресурс! Опитай пак!');
    }

    $insertQuery->bindParam(USER_ID_PARAM, $userId, PDO::PARAM_INT);
    $insertQuery->bindParam(LINK_PARAM, $link, PDO::PARAM_STR);
    $insertQuery->bindParam(TITLE_PARAM, $title, PDO::PARAM_STR);
    $insertQuery->bindParam(AUTHOR_PARAM, $author, PDO::PARAM_STR);
    $insertQuery->bindParam(MAX_READERS_PARAM, $maxReaders, PDO::PARAM_INT);
    $insertQuery->bindParam(MAX_DAYS_PARAM, $maxDays, PDO::PARAM_INT);

    try {
        $insertQuery->execute();
    } catch (PDOException $e) {
        http_response_code(500);
        exit('Неуспешно добавяне на ресурс! Опитай пак!');
    }

    echo 'Успешно добавен ресурс!';
?>
