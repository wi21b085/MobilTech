<?php
    include_once ("../models/productClass.php");
    include_once("../config/dbaccess.php");
    //hier wird das sql abfrage gemacht
    $sql = "SELECT * FROM produkte";
    //hier führen wir prepare statement aus
    $stmt = $db->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();

    //hier wird unser response gespeichert
    $product_list = array();
   
   while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
     //hier wird ein obj product erstellt
        $product = new productClass($row["id"],$row['name'],$row['firma'],$row['bild'],$row['preis'],$row['kurzbeschreibung'],$row['text'],$row['bewertung'] );
        //das obj product  wird auf array product_list gepushed
        array_push($product_list,$product);
    }

    $stmt->close();


    
    




        