<?php

session_start();

if (!isset($_SESSION["rolle"]) || $_SESSION["rolle"] != "admin") {
    return $response = array("failed" => false);
}

$data = json_decode($param);

$oid = $data->oid;
$mengen = $data->mengen;

if (empty($oid) || empty($mengen)) {
    $response = array("failed" => false);
} else {
    include_once("../config/dbaccess.php");

    $kvPair = explode(",", $mengen);

    foreach ($kvPair as $part) {
        $pair = explode(":", $part);
        $key = $pair[0];
        $value = $pair[1];

        $sql = "UPDATE verlauf SET `menge` = ? WHERE `order_id` = ? AND `id` = ?";
        $stmt = mysqli_prepare($db, $sql);
        mysqli_stmt_bind_param($stmt, "sss", $value, $oid, $key);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
    }
    mysqli_close($db);
    $response = array("success" => true);
}
