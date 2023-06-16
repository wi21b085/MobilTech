<?php
include_once("../config/dbaccess.php");

//$uid = $_SESSION['id'];

$sql = "SELECT * FROM user WHERE username = ?";
$stmt = $db->prepare($sql);
$stmt->bind_param("s", $param);
$stmt->execute();
$result = $stmt->get_result();

$user_info = null;

if ($result->num_rows == 1) {
    $row = $result->fetch_assoc();
    $user_info = $row;
}
if ($row = $result->fetch_assoc()) {
        $tab = array(
        'vorname' => $row['vorname'],
        'nachname' => $row['nachname'],
        'username' => $row['username'],
        'email' => $row['email'],
        'adresse' => $row['adresse'],
        'plz' => $row['plz'],
        'ort' => $row['ort'],
    );
}

$stmt->close();
