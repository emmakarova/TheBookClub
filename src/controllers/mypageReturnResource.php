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

    // return resource with 'resource_id' taken from this user
    $resourceId = $_POST["resource_id"];

    $query = $db->prepare(RETURN_RESOURCE);
    if(!$query) {
        http_response_code(500);
        exit('Error preparing the statement.');
    }

    $query->bindParam(RESOURCE_ID_PARAM, $resourceId, PDO::PARAM_INT);
    $query->bindParam(USER_ID_PARAM, $userId, PDO::PARAM_INT);
    if (!$query->execute()) {
        http_response_code(500);
        exit('<p class="error">Something went wrong!</p>');
    }

    // add rate
    $rate = $_POST["rate"];

    $addRateQuery = $db->prepare(ADD_RATE);
    if(!$addRateQuery) {
        http_response_code(500);
        exit('Error preparing the statement.');
    }

    $addRateQuery->bindParam(RESOURCE_ID_PARAM, $resourceId, PDO::PARAM_INT);
    $addRateQuery->bindParam(USER_ID_PARAM, $userId, PDO::PARAM_INT);
    $addRateQuery->bindParam(RATE_PARAM, $rate, PDO::PARAM_INT);
    if (!$addRateQuery->execute()) {
        http_response_code(500);
        exit('<p class="error">Something went wrong!</p>');
    }
?>
