<?php
// require_once "config/db.php";

require '../src/connect.php';

// function getResources() {
    if ($_SERVER["REQUEST_METHOD"] == "GET") {
          
        if($query = $db->prepare("select * from resources")) {
            $error = '';

            $query->execute();
            $c = $query->fetchAll();
            // echo "hi";
            // echo gettype($c);
            foreach($c as $v) {
                echo $v[1];

            }

            // return $c;
        }
    }
// }

// getResources();
    
?>