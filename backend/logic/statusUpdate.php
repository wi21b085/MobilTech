<?php
require_once("../config/dbaccess.php");

if ($status == 1) { // status auf inaktiv setzen
    $status = 0;
    $sql = "UPDATE user SET `status`= ? WHERE id = ?;";
    $stmt = $db->prepare($sql);
} else { // status auf aktiv setzen
    $status = 1;
    $sql = "UPDATE user SET `status`= ? WHERE id = ?;";
    $stmt = $db->prepare($sql);
}
$stmt->bind_param("ii",  $status, $uid);
$stmt->execute();

$stmt->close();
$db->close();

$res["success"] = true;