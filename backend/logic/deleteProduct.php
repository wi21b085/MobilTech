<?php

$id = $data->id;

include_once("../config/dbaccess.php");

$sql = "DELETE FROM produkte WHERE id = ?";
$stmt = $db->prepare($sql);
$stmt->bind_param("i", $id);
if($stmt->execute()){
    $response["success"] = true;
    var_dump($data);
}

$stmt->close();