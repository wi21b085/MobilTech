<?php
include_once("../config/dbaccess.php");

$sql = "SELECT orders.id AS order_id, verlauf.produkt_id, verlauf.menge, verlauf.preis, orders.o_datum 
        FROM orders 
        INNER JOIN verlauf ON orders.id = verlauf.order_id";

$stmt = $db->prepare($sql);
$stmt->execute();
$result = $stmt->get_result();

$verlauf_list = array();

while ($row = $result->fetch_assoc()) {
    $verlauf_list[] = $row;
}

$stmt->close();


?>
