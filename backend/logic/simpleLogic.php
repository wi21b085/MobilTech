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
            case "updateProduct":
                $result = $this->dh->updateProduct($param);
                break;
            case "deleteProduct":
                $result = $this->dh->deleteProduct($param);
                break;
            case "addToCart":
                $result = $this->dh->addToCart($param);
                break;
            case "viewProduct":
                $result = $this->dh->viewProduct();
                break;
            case "viewVerlauf":
                $result = $this->dh->viewVerlauf();
                break;
            case "viewCustomers":
                $result = $this->dh->viewCustomers();
                break;
            case "kassa":
                $result = $this->dh->kassa();
                break;
            case "search":
                $result = $this->dh->search($param);
                break;
            case "indexCategory":
                $result = $this->dh->indexCategory();
                break;
            case "viewAccount":
                $result = $this->dh->viewAccount($param);
                break;
            case "statusUpdate":
                $result = $this->dh->statusUpdate($param);
                break;
            case "checkAdmin":
                $result = $this->dh->checkAdmin();
                break;
            case "editAccount":
                $result = $this->dh->editAccount($param);
                break;
            case "bestellen":
                $result = $this->dh->bestellen($param);
                break;
            case "verifyPassword":
                $result = $this->dh->verifyPassword($param);
                break;
            case "updatePassword":
                $result = $this->dh->updatePassword($param);
                break;
            default:
                $result = null;
                break;
        }
        return $result;
    }
}
