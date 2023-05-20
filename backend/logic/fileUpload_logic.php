<?php

if(isset($_FILES['bild'])){

    $bild = $_FILES['bild']['name'];
    $bild_size = $_FILES['bild']['size'];
    $bild_name = $_FILES['bild']['tmp_name'];
 
        if($bild_size > 100000000){
            $response = array("failed_size" => false);
        }
        else{
            $bild_ex = pathinfo($bild_name, PATHINFO_EXTENSION);
            
            $bild_ex_lc=strtolower($bild_ex);

            $allowed_exs=array("jpg","jpeg","png");

            if(in_array($bild_ex_lc,$allowed_exs)){

                $new_bild_name = uniqid("IMG-",true).'.'.$bild_ex_lc;
                
                if (!is_dir("../products")) {
                    mkdir("../products");
                }

                $bild_upload_path = "../products/" . $new_bild_name;

                $bild_new = "../../backend/products/" . $new_bild_name;
                

                move_uploaded_file($tmp_name, $bild_upload_path);
                

                

            }else{
                $response = array("failed_exs" => false);

            }
        }

   
}

?>