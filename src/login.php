<?php

require_once "../src/connect.php";

session_start();

if (!$_POST) {
    exit;
}

$username = $_POST['username'];
$password = $_POST['password'];

$query = $db->prepare("SELECT password FROM users
                       WHERE username = :username");
if (!$query) {
    exit('Error preparing the statement.');
}

$query->bindParam("username", $username, PDO::PARAM_STR);
if (!$query->execute()) {
    exit('<p class="error">Something went wrong!</p>');
}

$result = $query->fetchAll();
$encryptedPassword = $result[0]['password'];

if (!password_verify($password, $encryptedPassword)) {
    exit('<p class="error">Wrong password!</p>');
}

$_SESSION['valid'] = true;
$_SESSION['username'] = $username;

// redirect
ob_start(); 
header('Refresh: 1; URL = ../afterLogin.html');
ob_end_flush(); 

exit('<p class="success">Your registration was successful!</p>');

?>