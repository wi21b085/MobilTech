<?php
//Session start um die Werte die im Session sind erhalten
session_start();
//DB Verbindung herstellen 
include_once("../config/dbaccess.php");
$username;
//verlauf_list wird wenn eine erfolgreiche abfrage gibt, die daten speichern.
$verlauf_list = array();

if (isset($_SESSION["rolle"])) {
    if ($_SESSION["rolle"] == "admin") {
        $username = $param["username"];
    } else {
        $username = $_SESSION["username"];
    }

    //Hier werden die Daten, die in Tabellen user, order, verlauf product mit einem join abgefragt  
    $sql = "SELECT o.o_datum AS datum, o.id AS order_id, pr.name AS produkt_name, v.id AS verlauf_id, v.menge AS menge_produkt, v.preis AS preis_produkt, o.endpreis AS gesamtpreis
        FROM orders o
        INNER JOIN verlauf v ON o.id = v.order_id
        INNER JOIN produkte pr ON v.produkt_id = pr.id
        INNER JOIN user u ON o.u_id = u.id
        WHERE u.username = ?";
//Hier verwenden wir prepared statement
    $stmt = $db->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
        //Hier machen wir die datum sauber damit es kein zeit weiter zeigt.
        $row["datum"] = date('d.m.Y', strtotime(substr($row["datum"],0,10)));
        //Hier wir das verlauf_list[] ausgefüllt
        $verlauf_list[] = $row;
    }

    $stmt->close();
}else{
    //Wenn keine rolle in session gespeichert ist, dann schicken wir ein response false
    $verlauf_list["success"] = false;
}
