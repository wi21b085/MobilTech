<?php

$data = json_decode($param);

$name = htmlspecialchars($data->name);
$preis = htmlspecialchars($data->preis);
$firma = htmlspecialchars($data->firma);
$text = htmlspecialchars($data->text);
$kurzbeschreibung = htmlspecialchars($data->kurzbeschreibung);
$bild = $data->bild;


if (empty($name) || empty($preis) || empty($kurzbeschreibung) || empty($text) || empty($firma) || empty($bild)) {
    $response = array("failed" => false);
} else {
    require_once("fileUpload_logic.php");

    include_once("../config/dbaccess.php");

    
    $sql = "INSERT INTO produkte (`name`, firma, preis, text, kurzbeschreibung, bild) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = mysqli_prepare($db, $sql);
    $stmt->bind_param("ssdsss", $name, $firma, $preis, $text, $kurzbeschreibung, $bild_new);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    mysqli_close($db);

    $response = array("success" => true);
}


?>
