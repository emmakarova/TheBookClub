<?php
    require_once "./connect.php";
    require_once "../globals/queries.php";

    if ($_SERVER["REQUEST_METHOD"] != "GET" && $_SERVER["REQUEST_METHOD"] != "POST") {
        http_response_code(400);
        exit('<p class="error">Unexpected call!</p>');
    }

    session_start();

    if ($_SERVER["REQUEST_METHOD"] == "GET") {
        $query = $db->prepare(GET_ALL_RESOURCES);
        if(!$query) {
            http_response_code(500);
            exit('Error preparing the statement.');
        }
    
        $query->execute();
        $result = $query->fetchAll(PDO::FETCH_ASSOC);
            
        echo json_encode($result);
        return;
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $query = $db->prepare(INSERT_RESOURCES_TAKEN);
        if(!$query) {
            http_response_code(500);
            exit('Error preparing the statement.');
        }

        $resource_id = $_POST["resource_id"];
        $user_id = $_SESSION['user_id'];
     
        $query->bindParam("resource_id", $resource_id, PDO::PARAM_INT);
        $query->bindParam("user_id", $user_id, PDO::PARAM_INT);

        // if (!$query->execute()) {
        //     http_response_code(500);
        //     exit('<p class="error">Something went wrong!</p>');
        // }

        try {
            $query->execute();
            echo "success";
        }
        catch(PDOException $e) {
            http_response_code(500);
            echo "The resource is already taken from this user!";
        }
    }
?>
