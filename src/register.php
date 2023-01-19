<?php

require_once "../src/connect.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $confirm_password = $_POST["confirm_password"];
 
    $password_hash = password_hash($password, PASSWORD_BCRYPT);
   
    if($query = $db->prepare("select * from users where username = :username")) {
        $error = '';

        $query->execute(array(':username' => $username));

        // $query->store_result();

        if ($query->rowCount() > 0) {
            $error .= '<p class="error">The email address is already registered!</p>';
        } else {
            if (empty($confirm_password)) {
                $error .= '<p class="error">Please enter confirm password.</p>';
            } else {
                if (empty($error) && ($password != $confirm_password)) {
                    $error .= '<p class="error">Password did not match.</p>';
                }
            }
            if (empty($error) ) {
                $insertQuery = $db->prepare("INSERT INTO users (username, password) VALUES (:username, :password);");
                $insertQuery->bindParam("username", $username, PDO::PARAM_STR);
                $insertQuery->bindParam("password", $password_hash, PDO::PARAM_STR);

                $result = $insertQuery->execute();
                if ($result) {
                    $error .= '<p class="success">Your registration was successful!</p>';
                } else {
                    $error .= '<p class="error">Something went wrong!</p>';
                }
            }
        }
    }
    // $query->close();
    // $insertQuery->close();
}
?>