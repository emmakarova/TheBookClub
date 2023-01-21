<?php

require_once "../src/connect.php";

if (!$_POST) {
    exit;
}

$username = $_POST['username'];
$password = $_POST['password'];
$confirm_password = $_POST["confirm_password"];

$password_hash = password_hash($password, PASSWORD_BCRYPT);

$query = $db->prepare("SELECT * FROM users
                       WHERE username = :username");
if (!$query) {
    exit("Error preparing the statement.");
}

$query->bindParam("username", $username, PDO::PARAM_STR);
if (!$query->execute()) {
    exit('<p class="error">Something went wrong!</p>');
}

if ($query->rowCount() > 0) {
    exit('<p class="error">This username is already used!</p>');
}

if ($password != $confirm_password) {
    exit('<p class="error">Passwords did not match.</p>');
}

$insertQuery = $db->prepare("INSERT INTO users (username, password)
                             VALUES (:username, :password);");
if (!$insertQuery) {
    exit("Error preparing the statement.");
}

$insertQuery->bindParam("username", $username, PDO::PARAM_STR);
$insertQuery->bindParam("password", $password_hash, PDO::PARAM_STR);

if (!$insertQuery->execute()) {
    exit('<p class="error">Something went wrong!</p>');
}

exit('<p class="success">Your registration was successful!</p>');

?>