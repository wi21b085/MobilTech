<?php
session_start();
include_once("../config/dbaccess.php");
//hier bekommt man das id von der product
$productId = $data->productId;
//hier bekommt man das quantity von der product
$quantity = $data->quantity; 

//hier wird das query in einem prepared statement ausgeführt
$stmt = $db->prepare("SELECT `id`, `name`, `preis`, `bild` FROM `produkte` WHERE `id` = ?");
//hier wird mit bind_param das productid gegeben
$stmt->bind_param("i", $productId);
$stmt->execute();
//hier bekommen wir die Variablen die man braucht
$stmt->bind_result($id, $name, $price, $bild);
$stmt->fetch();
$stmt->close();
//die Variablen werden in $response array hizugefügt
$response = array(
    'productId' => $productId,
    'name' => $name,
    'price' => $price,
    'quantity' => $quantity,
    'bild' => $bild
);

?>
