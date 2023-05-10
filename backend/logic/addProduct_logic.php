<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $preis = htmlspecialchars($_POST["preis"]);
    $firma = htmlspecialchars($_POST["firma"]);
    $text = htmlspecialchars($_POST["text"]);
    $kurzbeschreibung = htmlspecialchars($_POST["kurzbeschreibung"]);

    if (empty($name) || empty($preis) || empty($kurzbeschreibung) || empty($text) || empty($firma)) {
        //echo "Empty Daten :(";
        $response = array("failed" => false);
        echo json_encode($response);
    } else {
        include_once("../config/dbaccess.php");

        $sql = "INSERT INTO produkte (`name`, firma, preis, text, kurzbeschreibung) VALUES (?, ?, ?, ?, ?)";
        $stmt = mysqli_prepare($db, $sql);
        mysqli_stmt_bind_param($stmt, "ssiss", $name, $firma, $preis, $text, $kurzbeschreibung);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
        mysqli_close($db);

        $response = array("success" => true);
        echo json_encode($response);
    }
}

?>
