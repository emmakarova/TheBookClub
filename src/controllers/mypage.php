<?php
    require_once "./connect.php";
    require_once "../globals/queries.php";

    session_start();

    // check if authorized
    if (!isset($_SESSION["valid"])) {
        http_response_code(401);
        exit('<p class="error">Unathorized!</p>');
    }

    if ($_SERVER["REQUEST_METHOD"] != "GET") {
        http_response_code(400);
        exit('<p class="error">Unexpected call!</p>');
    }

    // get user_id
    $username = $_SESSION["username"];

    $getUserIdquery = $db->prepare(GET_USER_ID);
    if(!$getUserIdquery) {
        http_response_code(500);
        exit('Error preparing the statement.');
    }

    $getUserIdquery->bindParam(USERNAME_PARAM, $username, PDO::PARAM_STR);
    if (!$getUserIdquery->execute()) {
        http_response_code(500);
        exit('<p class="error">Something went wrong!</p>');
    }

    $result = $getUserIdquery->fetchAll();
    $userId = $result[0]['user_id'];

    // get all currently reading resources for this user
    $query = $db->prepare(GET_CURRENTLY_READING);
    if(!$query) {
        http_response_code(500);
        exit('Error preparing the statement.');
    }

    $query->bindParam(USER_ID_PARAM, $userId, PDO::PARAM_INT);
    if (!$query->execute()) {
        http_response_code(500);
        exit('<p class="error">Something went wrong!</p>');
    }
    $result = $query->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($result);
?>
