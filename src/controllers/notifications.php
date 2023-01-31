<?php
    require_once "./connect.php";
    require_once "../globals/queries.php";

    session_start();

    // check if authorized
    if (!isset($_SESSION["valid"])) {
        http_response_code(401);
        exit('<p class="error">Unathorized!</p>');
    }

    $userId = $_SESSION["user_id"];

    if ($_SERVER["REQUEST_METHOD"] == "GET") {
        return getNotifications($db, $userId);
    } else if ($_SERVER["REQUEST_METHOD"] == "POST") {
        return markAsRead($db, $userId);
    } else {
        http_response_code(400);
        exit('<p class="error">Unexpected call!</p>');
    }

    // get all currently reading resources for this user
    function getNotifications($db, $userId) {
        $query = $db->prepare(GET_NOTIFICATIONS);
        if (!$query) {
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
    }

    // return resource with 'resource_id' taken from this user
    function markAsRead($db, $userId) {
        $notificationId = $_POST["notification_id"];

        $query = $db->prepare(MARK_NOTIFICATION_AS_READ);
        if(!$query) {
            http_response_code(500);
            exit('Error preparing the statement.');
        }

        $query->bindParam(NOTIFICATION_ID_PARAM, $notificationId, PDO::PARAM_INT);
        if (!$query->execute()) {
            http_response_code(500);
            exit('<p class="error">Something went wrong!</p>');
        }
    }
?>
