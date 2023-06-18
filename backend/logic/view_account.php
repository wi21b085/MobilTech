<?php
include_once("../config/dbaccess.php");

$sql = "SELECT * FROM user WHERE username = ?";
$stmt = $db->prepare($sql);
$stmt->bind_param("s", $param); 
$stmt->execute();
$result = $stmt->get_result();


if ($row = $result->fetch_assoc()) {
    $customer = array(
        'id' => $row['id'],
        'anrede' => $row['anrede'],
        'vorname' => $row['vorname'],
        'nachname' => $row['nachname'],
        'username' => $row['username'],
        'email' => $row['email'],
        'adresse' => $row['adresse'],
        'plz' => $row['plz'],
        'ort' => $row['ort'],
        'zahlung' => $row['zahlung'],
        'status' => $row['status']
    );
}else{
    echo "No rows found";
    echo json_encode($row);
}
$stmt->close();
?>
