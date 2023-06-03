<?php
include("../config/dataHandler.php");

class SimpleLogic
{
    private $dh;
    function __construct()
    {
        $this->dh = new DataHandler();
    }

    function handleRequest($method, $param)
    {
        switch ($method) {
            case "register":
                $result = $this->dh->register($param);
                break;
            case "login":
                $result = $this->dh->login($param);
                break;
            case "logout":
                $result = $this->dh->logout();
                break;
            case "addProduct":
                $result = $this->dh->addProduct($param);
                break;
            case "addToCart":
                $result = $this->dh->addToCart($param);
                break;
            case "viewProduct":
                $result = $this->dh->viewProduct();
                break;
            case "viewCustomers":
                $result = $this->dh->viewCustomers();
                break;
            case "search":
                $result = $this->dh->search($param);
                break;
            default:
                $result = null;
                break;
        }
        return $result;
    }
}
