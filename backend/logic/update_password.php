<?php
$data = $param;
$newPassword = $data['newPassword'];
$username =$data['username'];

$uppercase = preg_match('@[A-Z]@', $newPassword);
$lowercase = preg_match('@[a-z]@', $newPassword);
$number    = preg_match('@[0-9]@', $newPassword);
$specialChars = preg_match('@[^\w]@', $newPassword);
$pw_err = false;
//Passwort-Policy checken
if ($uppercase == false || $lowercase == false || $number == false || $specialChars  == false || strlen($newPassword) < 8) {
    $response["success"] = false;

} else {
    $newPassword = htmlspecialchars($newPassword, ENT_QUOTES);
    $newPassword = password_hash($newPassword, PASSWORD_DEFAULT);
        require_once("../config/dbaccess.php");


        $sql = 'UPDATE user SET password = ? WHERE username = ?';
        $stmt = mysqli_prepare($db, $sql);
        mysqli_stmt_bind_param($stmt, "ss", $newPassword, $username);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
        mysqli_close($db);
        $response["success"] = true;
}
