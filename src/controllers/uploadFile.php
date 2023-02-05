<?php
    session_start();

    // check if authorized
    if (!isset($_SESSION["valid"])) {
        http_response_code(401);
        exit('Unathorized!');
    }

    if ($_SERVER["REQUEST_METHOD"] != "POST") {
        http_response_code(400);
        exit('Unexpected call!');
    }

    /* Get the name of the uploaded file */
    $filename = $_FILES['file']['name'];

    /* Choose where to save the uploaded file */
    $location = "../../uploadedFiles/" . $filename;

    // Check if file already exists
    if (file_exists($location)) {
        http_response_code(409);
        exit('A file with this name already exists.');
    }

    /* Save the uploaded file to the local filesystem */
    if (move_uploaded_file($_FILES['file']['tmp_name'], $location)) { 
        echo 'Успешно добавен файл!'; 
    } else { 
        echo 'Неуспешно добавен файл!'; 
    }

    exit();
?>
