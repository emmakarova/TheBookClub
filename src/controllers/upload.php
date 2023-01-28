<?php
    require_once "./connect.php";
    require_once "../globals/queries.php";

    session_start();

    // check if authorized
    if (!isset($_SESSION["valid"])) {
        http_response_code(401);
        exit('<p class="error">Unathorized!</p>');
    }

    if ($_SERVER["REQUEST_METHOD"] != "POST") {
        http_response_code(400);
        exit('<p class="error">Unexpected call!</p>');
    }

    $link = $_POST['link'];
    $title = $_POST['title'];
    $author = $_POST["author"];
    $maxReaders = $_POST["max-readers"];
    $maxDays = $_POST["max-days"];

    $insertQuery = $db->prepare(UPLOAD_RESOURCE);
    if (!$insertQuery) {
        http_response_code(500);
        exit("Error preparing the statement.");
    }

    $insertQuery->bindParam(LINK_PARAM, $link, PDO::PARAM_STR);
    $insertQuery->bindParam(TITLE_PARAM, $title, PDO::PARAM_STR);
    $insertQuery->bindParam(AUTHOR_PARAM, $author, PDO::PARAM_STR);
    $insertQuery->bindParam(MAX_READERS_PARAM, $maxReaders, PDO::PARAM_INT);
    $insertQuery->bindParam(MAX_DAYS_PARAM, $maxDays, PDO::PARAM_INT);

    if (!$insertQuery->execute()) {
        http_response_code(500);
        exit('<p class="error">Something went wrong!</p>');
    }

    echo "Successfully uploaded resource!";

    exit();
?>
