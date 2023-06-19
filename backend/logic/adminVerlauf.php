<?php

$data = json_decode($param);

$oid = $data->oid;
$mengen = $data->mengen;

//var_dump($data); // Display the received data

//var_dump($anrede, $vorname, $nachname, $email, $add, $plz, $ort); // Debugging statement

if (empty($oid) || empty($mengen)) {
    $response = array("failed" => false);
} else {
    include_once("../config/dbaccess.php");
    $oid = intval($oid);

    $sql = "UPDATE verlauf SET `anrede` = ?, `vorname` = ?, `nachname` = ?, `email` = ?, `adresse` = ?, `plz` = ?, `ort` = ? WHERE `username` = ?";
    $stmt = mysqli_prepare($db, $sql);
    mysqli_stmt_bind_param($stmt, "sssssiss", $anrede, $vorname, $nachname, $email, $adresse, $plz, $ort, $username);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    mysqli_close($db);
    $response = array("success" => true);
}

//var_dump($response); // Display the response
