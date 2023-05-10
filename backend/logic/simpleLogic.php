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
            default:
                $result = null;
                break;
        }
        return $result;
    }
}
