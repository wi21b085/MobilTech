<?php
        $data = json_decode($param);

    $name = htmlspecialchars($data->name);
    $preis = htmlspecialchars($data->preis);
    $firma = htmlspecialchars($data->firma);
    $text = htmlspecialchars($data->text);
    $kurzbeschreibung = htmlspecialchars($data->kurzbeschreibung);
    //$bild = htmlspecialchars($data->bild);

    if (empty($name) || empty($preis) || empty($kurzbeschreibung) || empty($text) || empty($firma)) {
        //echo "Empty Daten :(";
        $response = array("failed" => false);
    } else {
        include_once("../config/dbaccess.php");

        $sql = "INSERT INTO produkte (`name`, firma, preis, text, kurzbeschreibung) VALUES (?, ?, ?, ?, ?)";
        $stmt = mysqli_prepare($db, $sql);
        mysqli_stmt_bind_param($stmt, "ssiss", $name, $firma, $preis, $text, $kurzbeschreibung);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
        mysqli_close($db);

        $response = array("success" => true);
    }


?>
