<?php 
include_once("../config/dbaccess.php");

//mit array_sum() werde ich die sume von dem ganzen array produktenGesamtPreis rechnen
$endpreis = array_sum($param['produktenGesamtPreis']);

$u_id = $_SESSION['id'];
$sql = "INSERT INTO orders (u_id) VALUES (?)";
$stmt = $db->prepare($sql);
$stmt->bind_param("d", $u_id);
$stmt->execute();
//ob einfügen erfolgreich war
if ($stmt->affected_rows > 0) {
    //order_id abrufen
    $order_id = $db->insert_id;
    foreach ($param['produktenGesamtPreis'] as $i => $endpreis) {
        $p_id = $param['produktenId'][$i];
        $menge = $param['produktenMengen'][$i];
        $preis = $param['produktenPreise'][$i];

        $sql = "INSERT INTO verlauf (order_id, produkt_id, menge, preis) VALUES (?, ?, ?, ?)";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("iddd", $order_id, $p_id, $menge, $preis);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $response = array("success" => true);
        } else {
            $sql = "DELETE FROM orders WHERE order_id = ?";
            $stmt = $db->prepare($sql);
            $stmt->bind_param("d", $order_id);
            $stmt->execute();
            $response = array("failed" => true);
        }
    }

    if (!isset($response)) {
        $response = array("failed" => false);
    }
} else {
    $response = array("failed" => false);
}

?>
