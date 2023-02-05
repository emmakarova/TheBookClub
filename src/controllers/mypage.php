<?php
    require_once "./connect.php";
    require_once "../globals/queries.php";

    session_start();

    // check if authorized
    if (!isset($_SESSION["valid"])) {
        http_response_code(401);
        exit('Unathorized!');
    }

    $userId = $_SESSION["user_id"];

    if ($_SERVER["REQUEST_METHOD"] == "GET" && !$_SERVER["QUERY_STRING"]) {
        return getMyResources($db, $userId);
    } else if ($_SERVER["REQUEST_METHOD"] == "GET" && $_SERVER["QUERY_STRING"]) {
        return getMyProfile($db, $userId);
    } else if ($_SERVER["REQUEST_METHOD"] == "POST") {
        return deleteResource($db, $userId);
    } else {
        http_response_code(400);
        exit('Unexpected call!');
    }

    // get all currently reading resources for this user
    function getMyResources($db, $userId) {
        $query = $db->prepare(GET_MY_RESOURCES);
        if (!$query) {
            http_response_code(500);
            exit('Error preparing the statement.');
        }

        $query->bindParam(USER_ID_PARAM, $userId, PDO::PARAM_INT);
        if (!$query->execute()) {
            http_response_code(500);
            exit('Something went wrong');
        }
        $result = $query->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($result);
    }

    function getMyProfile($db, $userId) {
        $query = $db->prepare(GET_PROFILE_INFO);
        if(!$query) {
            http_response_code(500);
            exit('Error preparing the statement.');
        }

        $query->bindParam(USER_ID_PARAM, $userId, PDO::PARAM_INT);
        if (!$query->execute()) {
            http_response_code(500);
            exit('Something went wrong!');
        }
        $result = $query->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($result);
    }

    // return resource with 'resource_id' taken from this user
    function deleteResource($db, $userId) {
        $resourceId = $_POST["resource_id"];

        $query = $db->prepare(DELETE_RESOURCE);
        if(!$query) {
            http_response_code(500);
            exit('Error preparing the statement.');
        }

        $query->bindParam(RESOURCE_ID_PARAM, $resourceId, PDO::PARAM_INT);
        if (!$query->execute()) {
            http_response_code(500);
            exit('Something went wrong!');
        }

        echo 'Успешно изтрит ресурс!';
    }
?>
