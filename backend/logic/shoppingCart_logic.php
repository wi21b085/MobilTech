<?php
session_start();
include_once("../config/dbaccess.php");

$productId = $data->productId;
$quantity = $data->quantity; 

$stmt = $db->prepare("SELECT `id`, `name`, `preis`, `bild` FROM `produkte` WHERE `id` = ?");
$stmt->bind_param("i", $productId);
$stmt->execute();
$stmt->bind_result($id, $name, $price, $bild);
$stmt->fetch();
$stmt->close();

$response = array(
    'productId' => $productId,
    'name' => $name,
    'price' => $price,
    'quantity' => $quantity,
    'bild' => $bild
);

?>
