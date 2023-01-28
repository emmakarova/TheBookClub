<?php
$target_dir = "../../uploadedFiles/";
$target_file = $target_dir . basename($_FILES["file"]["name"]);
$uploadOk = true;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
// Check if image file is a actual image or fake image
if (isset($_POST["submit"])) {

    // Check if file already exists
    if (file_exists($target_file)) {
        echo "Sorry, file already exists.";
        $uploadOk = false;
    }

    // Check file size
    if ($_FILES["file"]["size"] > 500000) {
        echo "Sorry, your file is too large.";
        $uploadOk = false;
    }

    //   // Allow certain file formats
    //   if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
    //   && $imageFileType != "gif" ) {
    //     echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    //     $uploadOk = 0;
    //   }

    // Check if $uploadOk is set to 0 by an error
    if (!$uploadOk) {
        echo "Sorry, your file was not uploaded.";
        // if everything is ok, try to upload file
    } else {
        if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
            echo "The file " . htmlspecialchars(basename($_FILES["file"]["name"])) . " has been uploaded.";
        } else {
            echo "Sorry, there was an error uploading your file.";
        }
    }

}



//     require_once "./connect.php";
//     require_once "../globals/queries.php";

//     session_start();

//     // check if authorized
//     if (!isset($_SESSION["valid"])) {
//         http_response_code(401);
//         exit('<p class="error">Unathorized!</p>');
//     }

//     if ($_SERVER["REQUEST_METHOD"] != "POST") {
//         http_response_code(400);
//         exit('<p class="error">Unexpected call!</p>');
//     }

//     $link = $_POST['link'];
//     $title = $_POST['title'];
//     $author = $_POST["author"];
//     $maxReaders = $_POST["max-readers"];
//     $maxDays = $_POST["max-days"];

//     // $filename = $_FILES['file']['name'];
// print_r($_FILES);
// // echo  "size = " . count($_FILES);
//     foreach ($_FILES as $file ) {
//         echo "--" . $file;
//     }

//     $insertQuery = $db->prepare(UPLOAD_RESOURCE);
//     if (!$insertQuery) {
//         http_response_code(500);
//         exit("Error preparing the statement.");
//     }

//     $insertQuery->bindParam(LINK_PARAM, $link, PDO::PARAM_STR);
//     $insertQuery->bindParam(TITLE_PARAM, $title, PDO::PARAM_STR);
//     $insertQuery->bindParam(AUTHOR_PARAM, $author, PDO::PARAM_STR);
//     $insertQuery->bindParam(MAX_READERS_PARAM, $maxReaders, PDO::PARAM_INT);
//     $insertQuery->bindParam(MAX_DAYS_PARAM, $maxDays, PDO::PARAM_INT);

//     if (!$insertQuery->execute()) {
//         http_response_code(500);
//         exit('<p class="error">Something went wrong!</p>');
//     }

//     echo "Successfully uploaded resource!";

//     exit();
?>
