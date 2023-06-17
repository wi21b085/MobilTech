<?php

include("../logic/simpleLogic.php");

$request = $_SERVER['REQUEST_METHOD'];
$param = "";
$method = "";
$bild = null; // Initialize the $files variable

if ($request == "GET") {
    isset($_GET["method"]) ? $method = $_GET["method"] : false;
    isset($_GET["param"]) ? $param = $_GET["param"] : false;
} else if ($request == "POST") {
    isset($_POST["method"]) ? $method = $_POST["method"] : false;
    isset($_POST["param"]) ? $param = $_POST["param"] : false;

    if ($method == "updateProduct") {
        $param = $_POST;
    }

    isset($_FILES["bild"]) ? $param = $_POST : false;
    isset($_FILES["bild"]) ? $param["bild"] = $_FILES["bild"] : false;
    //isset($_FILES["bild"]) ? $param = $_FILES["bild"] : false; // Check if $_FILES is set and assign it to $files
} else {
    response($request, 405, "Method not supported yet!");
    exit;
}

$logic = new SimpleLogic();
$result = $logic->handleRequest($method, $param);
if ($result == null) {
    response($request, 400, null);
} else {
    response($request, 200, $result);
}

function response($method, $httpStatus, $data)
{
    header('Content-Type: application/json');
    switch ($method) {
        case "GET":
            http_response_code($httpStatus);
            echo (json_encode($data));
            break;
        case "POST":
            http_response_code($httpStatus);
            echo (json_encode($data));
            break;
        default:
            http_response_code(405);
            echo ("Method not supported yet!");
    }
}
