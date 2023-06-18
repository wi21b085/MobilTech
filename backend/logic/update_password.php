<?php

$newPassword = $_POST['password'];

if (updatePasswordInDatabase($newPassword)) {
    $response['success'] = true;
} else {
    $response['success'] = false;
}


function updatePasswordInDatabase($newPassword) {
    
    require_once("../config/dbaccess.php");

    
    $stmt = $db->prepare('UPDATE users SET password = ? WHERE username = ?');
    $stmt->bind_param('ss', $newPassword, $username);
    $result = $stmt->execute();
    $stmt->close();
    $db->close();

    return $result;
}
?>