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

    public function logout(){
        $res = [];
        include("../logic/logout.php");
        return $res;
    }
    public function viewProduct(){

        include("../logic/viewProducts_logic.php");
        return $product_list;
    }
    public function viewCustomers(){
        include("../logic/viewCustomers_logic.php");
        return $customer_list;
    }
    public function kassa($param){
        $customer = [];
        include("../logic/kassa_logic.php");
        return $customer;
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
    public function updateProduct($param){
        $response = [];
        include("../logic/updateProduct.php");
        return $response;
    }
    public function addToCart($param){
        $data = json_decode($param);
        $response = [];
        require_once("../logic/shoppingCart_logic.php");
        return $response;
    }
    public function indexCategory(){
        require_once("../logic/index_category.php");
        return $product_list;
        
    }
    public function viewAccount($param){
        $customer = [];
        include("../logic/view_account.php");
        return $customer;

    }
    public function statusUpdate($param){
        $res = [];

        $data = json_decode($param);
        $uid = $data->id;
        $status = $data->status;
        include("../logic/statusUpdate.php");
        return $res;
    }
    public function checkAdmin(){
        $res = [];
        $res["admin"] = false;
        include("../logic/checkAdmin.php");
        return $res;
    }
    public function editAccount($param){
        $response = [];
        include("../logic/edit_account.php");
        return $response;
    }

}
