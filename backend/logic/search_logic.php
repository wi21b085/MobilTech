<?php
include_once("../config/dbaccess.php");
include_once("../models/productClass.php");

$data = $searchData->item;
$sql = "SELECT * FROM produkte WHERE firma LIKE ? OR name LIKE ?;";
$stmt = $db->prepare($sql);
$searchParam = "%$data%";
$stmt->bind_param("ss", $searchParam, $searchParam);
$stmt->execute();
$result = $stmt->get_result();

$searched_product_list = array();

while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
    $product = new productClass($row["id"], $row['name'], $row['firma'], $row['bild'], $row['preis'], $row['kurzbeschreibung'], $row['text'], $row['bewertung']);
    array_push($searched_product_list, $product);
}

$stmt->close();
?>
