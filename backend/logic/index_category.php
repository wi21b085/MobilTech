<?php
include_once("../models/firmaProductClass.php");
include_once("../config/dbaccess.php");

    $sql = "SELECT firma, name ,bild , kurzbeschreibung FROM produkte GROUP BY firma";
    $stmt = $db->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $product_list = array();
    
    while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
        $product = new firmaProductClass( $row['name'], $row['firma'], $row['bild'],  $row['kurzbeschreibung']);
        array_push($product_list, $product);
    }
    $stmt->close();

?>


