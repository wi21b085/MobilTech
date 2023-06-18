<?php
$data = $param;

$name = isset($data["name"]) ? htmlspecialchars($data["name"]) : '';
$preis = isset($data["preis"]) ? htmlspecialchars($data["preis"]) : '';
$firma = isset($data["firma"]) ? htmlspecialchars($data["firma"]) : '';
$text = isset($data["text"]) ? htmlspecialchars($data["text"]) : '';
$kurzbeschreibung = isset($data["kurzbeschreibung"]) ? htmlspecialchars($data["kurzbeschreibung"]) : '';

//var_dump($name, $preis, $firma, $text, $kurzbeschreibung, $bild); // Debugging

if (empty($name) || empty($preis) || empty($kurzbeschreibung) || empty($text) || empty($firma)) {
    $response = array("failed" => false);
} else {
    require_once("fileUpload_logic.php");
    include_once("../config/dbaccess.php");

    $sql = "INSERT INTO produkte (`name`, firma, preis, text, kurzbeschreibung, bild) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = mysqli_prepare($db, $sql);
    mysqli_stmt_bind_param($stmt, "ssdsss", $name, $firma, $preis, $text, $kurzbeschreibung, $bild_new);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    mysqli_close($db);

    $response = array("success" => true);
}



















?>
