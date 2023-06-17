<?php

$data = $param;

$name = isset($data["name"]) ? htmlspecialchars($data["name"]) : '';
$preis = isset($data["preis"]) ? htmlspecialchars($data["preis"]) : '';
$firma = isset($data["firma"]) ? htmlspecialchars($data["firma"]) : '';
$text = isset($data["text"]) ? htmlspecialchars($data["text"]) : '';
$kurzbeschreibung = isset($data["kurzbeschreibung"]) ? htmlspecialchars($data["kurzbeschreibung"]) : '';
$id = isset($data["id"]) ? htmlspecialchars($data["id"]) : '';

//var_dump($data); // Debugging statement

if (empty($name) || empty($preis) || empty($kurzbeschreibung) || empty($text) || empty($firma) || $id == "NaN") {
    $response = array("failed" => false);
} else {
    include_once("../config/dbaccess.php");

    if (isset($_FILES['bild'])) {
        require_once("fileUpload_logic.php");
        $sql = "UPDATE produkte SET `name` = ?, `firma` = ?, `preis` = ?, `text` = ?, `kurzbeschreibung` = ?, `bild` = ? WHERE `id` = ?";
        $stmt = mysqli_prepare($db, $sql);
        mysqli_stmt_bind_param($stmt, "ssdsssi", $name, $firma, $preis, $text, $kurzbeschreibung, $bild_new, $id);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
        mysqli_close($db);
        $response = array("success" => true);
    } else {
        $sql = "UPDATE produkte SET `name` = ?, `firma` = ?, `preis` = ?, `text` = ?, `kurzbeschreibung` = ? WHERE `id` = ?";
        $stmt = mysqli_prepare($db, $sql);
        mysqli_stmt_bind_param($stmt, "ssdssi", $name, $firma, $preis, $text, $kurzbeschreibung, $id);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
        mysqli_close($db);
        $response = array("success" => true);
    }
}
