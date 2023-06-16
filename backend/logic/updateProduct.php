<?php

$data = $param;

$name = isset($data["name"]) ? htmlspecialchars($data["name"]) : '';
$preis = isset($data["preis"]) ? htmlspecialchars($data["preis"]) : '';
$firma = isset($data["firma"]) ? htmlspecialchars($data["firma"]) : '';
$text = isset($data["text"]) ? htmlspecialchars($data["text"]) : '';
$kurzbeschreibung = isset($data["kurzbeschreibung"]) ? htmlspecialchars($data["kurzbeschreibung"]) : '';

//var_dump($name, $preis, $firma, $text, $kurzbeschreibung, $bild); // Debugging statement

if (empty($name) || empty($preis) || empty($kurzbeschreibung) || empty($text) || empty($firma)) {
    $response = array("failed" => false);
} else {
    require_once("fileUpload_logic.php");
    include_once("../config/dbaccess.php");

    $stmt = $db->prepare("UPDATE produkte(`name`, firma, preis, text, kurzbeschreibung, bild) VALUES (?, ?, ?, ?, ?, ?) WHERE `id` = ?");
    $stmt->bind_param("ssdsssi", $name, $firma, $preis, $text, $kurzbeschreibung, $bild_new, $id);
    $stmt->execute();
    $stmt->close();
    $db->close();

    $response = array("success" => true);
}
