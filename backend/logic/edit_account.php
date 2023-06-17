<?php

$data =json_decode($param);

$anrede = $data->anrede;
        $vorname = $data->vorname;
        $nachname = $data->nachname;
        $username = $data->username;
        $email = $data->email;
        $adresse = $data->adresse;
        $plz = $data->plz;
        $ort = $data->ort;

//var_dump($data); // Display the received data

//var_dump($anrede, $vorname, $nachname, $email, $add, $plz, $ort); // Debugging statement

if (empty($anrede) || empty($vorname) || empty($nachname) || empty($email) || empty($adresse) || empty($plz) || empty($ort)) {
    $response = array("failed" => false);
} else {
    include_once("../config/dbaccess.php");
    $plz = intval($plz);

    $sql = "UPDATE user SET `anrede` = ?, `vorname` = ?, `nachname` = ?, `email` = ?, `adresse` = ?, `plz` = ?, `ort` = ? WHERE `username` = ?";
    $stmt = mysqli_prepare($db, $sql);
    mysqli_stmt_bind_param($stmt, "sssssiss", $anrede, $vorname, $nachname, $email, $adresse, $plz, $ort, $username);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    mysqli_close($db);
    $response = array("success" => true);
}

//var_dump($response); // Display the response

