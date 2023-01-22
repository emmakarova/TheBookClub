<?php
    require_once "./connect.php";
    require_once "../globals/queries.php";

    if ($_SERVER["REQUEST_METHOD"] != "GET") {
        http_response_code(400);
        exit('<p class="error">Unexpected call!</p>');
    }

    $query = $db->prepare(GET_ALL_RESOURCES);
    if(!$query) {
        http_response_code(500);
        exit('Error preparing the statement.');
    }

    $query->execute();
    $result = $query->fetchAll(PDO::FETCH_ASSOC);
        
    echo json_encode($result);
?>
