<?php
            include_once ("../models/customerClass.php");
            include_once("../config/dbaccess.php");

            $sql = "SELECT * FROM user";
            $stmt = $db->prepare($sql);
            $stmt->execute();
            $result = $stmt->get_result();

            $customer_list = array();
        
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
                $customer = new customerClass($row["id"],$row['vorname'],$row['nachname'],$row['username'],$row['email'],$row['adresse'],$row['plz'],$row['ort'],$row['status'],$row['admin'] );
                array_push($customer_list,$customer);
            }

        $stmt->close();