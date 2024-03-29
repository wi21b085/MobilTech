<?php
include_once("../config/dbaccess.php");
session_start();
if (isset($_SESSION["username"])) {
    $username = $_SESSION["username"];

    $sql = "SELECT * FROM user WHERE username = ?";
    $stmt = $db->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();


    if ($row = $result->fetch_assoc()) {
        $customer = array(
            'id' => $row['id'],
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

} else {
    $customer = array(
        'id' => "false"
    );
}

