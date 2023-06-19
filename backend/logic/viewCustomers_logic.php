<?php
include_once("../models/customerClass.php");
include_once("../config/dbaccess.php");

session_start();
//hier speichern wir die Kundinnen
$customer_list = array();
if (isset($_SESSION["rolle"]) && $_SESSION["rolle"] == "admin") {
    $sql = "SELECT * FROM user";
    $stmt = $db->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();

    while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
        //hier wird jedes mal ein customer obj erstellt
        $customer = new customerClass($row["id"], $row['vorname'], $row['nachname'], $row['username'], $row['email'], $row['adresse'], $row['plz'], $row['ort'], $row['status'], $row['admin']);
        //hier wird dieses obj in customer_list hinzugefügt
        array_push($customer_list, $customer);
    }

    $stmt->close();
} else {
    // wenn man kein admin ist dann wird ein response von false als antwort haben
    $customer_list = array(
        'admin' => "false"
    );
}
