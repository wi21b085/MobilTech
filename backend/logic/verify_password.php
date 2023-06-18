<?php

$username = $_POST['username'];
$password = $_POST['password'];

$storedPassword = retrievePasswordFromDatabase($username);


$response = ($storedPassword === $password);


echo json_encode($response);

function retrievePasswordFromDatabase($username) {
    
    require_once("../config/dbAccess.php");

    $stmt = $db->prepare('SELECT password FROM user WHERE username = ?');
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $stmt->bind_result($storedPassword);
    $stmt->fetch();
    $stmt->close();

    return $storedPassword;
}
?>
