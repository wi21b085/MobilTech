<?php
//include("../config/dbaccess.php");

class DataHandler
{

    public function register($param)
    {
        $data = json_decode($param);

        $anrede = $data->anrede;
        $vorname = $data->vorname;
        $nachname = $data->nachname;
        $username = $data->username;
        $email = $data->email;
        $password = $data->password;
        $password2 = $data->password2;
        $adresse = $data->adresse;
        $plz = $data->plz;
        $plz = intval($plz);
        $ort = $data->ort;

        $res = [];
        $res["url"] = "";
        $res["success"]  = false;
        include("../logic/register.php");
        return $res;
    }

    public function login($param)
    {
        $data = json_decode($param);
        $username = $data->username;
        $password = $data->password;
        $check = $data->check;
        $res = []; 
        $res["url"] = "";
        $res["success"]  = false;
        include("../logic/login.php");
        return $res;
    }

    public function logout()
    {;
    }
    public function viewProduct(){

        include("../logic/viewProducts_logic.php");
        return $product_list;
    }
    public function viewCustomers(){
        include("../logic/viewCustomers_logic.php");
        return $customer_list;
    }
    public function search($param){
        include("../logic/search_logic.php");
        return $searched_product_list;
    }
    public function addProduct($param){
        $response = [];
        include("../logic/addProduct_logic.php");
        return $response;
    }
    public function addToCart($param){
        $data = json_decode($param);
        $response = [];
        require_once("../logic/shoppingCart_logic.php");
        return $response;
    }

}
