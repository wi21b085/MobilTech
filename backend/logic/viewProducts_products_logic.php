<?php
    include_once ("../models/productClass.php");
    include_once("../config/dbaccess.php");

    $sql = "SELECT * FROM produkte";
    $stmt = $db->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();

  
    $product_list = array();
   
   while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
     
        $product = new productClass($row["id"],$row['name'],$row['firma'],$row['bild'],$row['preis'],$row['kurzbeschreibung'],$row['text'],$row['bewertung'] );
        array_push($product_list,$product);
    }


    $product_json = json_encode($product_list);
    echo $product_json;
    




        