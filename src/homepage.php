<?php

require '../src/connect.php';

if ($_SERVER["REQUEST_METHOD"] == "GET") {
        
    if($query = $db->prepare("select link, current_readers,max_reading_days from resources")) {
        $error = '';

        $query->execute();
        $c = $query->fetchAll(PDO::FETCH_ASSOC);
    
        echo json_encode($c);
    }
}

?>