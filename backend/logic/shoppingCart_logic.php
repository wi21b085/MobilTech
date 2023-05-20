<?php
session_start();
include_once("../config/dbaccess.php");

    $productId = $data->productId;
    $quantity = $data->quantity;

    $stmt = $db->prepare("SELECT name, preis FROM produkte WHERE id = ?");
    $stmt->bind_param("i", $productId);
    $stmt->execute();
    $stmt->bind_result($name, $price);
    $stmt->fetch();
    $stmt->close();

    $cartItem = array(
      'productId' => $productId,
      'name' => $name,
      'price' => $price,
      'quantity' => $quantity
    );

    if (!isset($_SESSION['cart'])) {
      $_SESSION['cart'] = array();
    }

    $_SESSION['cart'][] = $cartItem;

    $response = array(
      'name' => $name,
      'price' => $price,
      'quantity' => $quantity
    );
    

?>
