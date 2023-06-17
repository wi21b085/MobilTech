<?php
if(isset($param)){
$data = $param;

$anrede = isset($data["anrede"]) ? htmlspecialchars($data["anrede"]) : '';
$vorname = isset($data["vorname"]) ? htmlspecialchars($data["vorname"]) : '';
$nachname = isset($data["nachname"]) ? htmlspecialchars($data["nachname"]) : '';
$email = isset($data["email"]) ? htmlspecialchars($data["email"]) : '';
$add = isset($data["add"]) ? htmlspecialchars($data["add"]) : '';
$plz = isset($data["plz"]) ? htmlspecialchars($data["plz"]) : '';
$ort = isset($data["ort"]) ? htmlspecialchars($data["ort"]) : '';

var_dump($data); // Display the received data
}else{
    echo "No data recieved!";
}
//var_dump($anrede, $vorname, $nachname, $email, $add, $plz, $ort); // Debugging statement

if (empty($anrede) || empty($varname) || empty($nachname) || empty($email) || empty($add) || empty($plz) || empty($ort)) {
    $response = array("failed" => false);
} else {
    include_once("../config/dbaccess.php");

    $sql = "UPDATE produkte SET `anrede` = ?, `vorname` = ?, `nachname` = ?, `email` = ?, `adresse` = ?, `plz` = ?, `ort` = ? WHERE `username` = ?";
    $stmt = mysqli_prepare($db, $sql);
    mysqli_stmt_bind_param($stmt, "sssssis", $anrede, $vorname, $nachname, $email, $add, $plz, $ort);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    mysqli_close($db);
    $response = array("success" => true);
}

var_dump($response); // Display the response

return $response;
?>
