<?php

$username = $param['username'];
$password = $param['password'];

$response = array();
$response["success"] = retrievePasswordFromDatabase($username,$password);


function retrievePasswordFromDatabase($username, $password) {
    
    require_once("../config/dbAccess.php");

    $stmt = $db->prepare('SELECT password FROM user WHERE username = ?');
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $stmt->bind_result($storedPassword);
    
    $stmt->fetch();
    $stmt->close();

    return (password_verify($password, $storedPassword));
}
?>
