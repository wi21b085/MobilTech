<?php
/*$stmt = $pdo->prepare("UPDATE your_table SET status = :status, geburtsdatum = :geburtsdatum, email = :email, add = :add");
  $stmt->execute([
    ':status' => $status,
    ':geburtsdatum' => $geburtsdatum,
    ':email' => $email,
    ':add' => $add
  ]);

  
  if ($stmt->rowCount() > 0) {
    echo "Data has been updated successfully!";
  } else {
    echo "Failed to update data.";
  }*/
  $data = $param;

$status = isset($data["status"]) ? htmlspecialchars($data["name"]) : '';
$preis = isset($data["preis"]) ? htmlspecialchars($data["preis"]) : '';
$firma = isset($data["firma"]) ? htmlspecialchars($data["firma"]) : '';
$text = isset($data["text"]) ? htmlspecialchars($data["text"]) : '';
$kurzbeschreibung = isset($data["kurzbeschreibung"]) ? htmlspecialchars($data["kurzbeschreibung"]) : '';

//var_dump($name, $preis, $firma, $text, $kurzbeschreibung, $bild); // Debugging statement

if (empty($name) || empty($preis) || empty($kurzbeschreibung) || empty($text) || empty($firma)) {
    $response = array("failed" => false);
} else {
    require_once("fileUpload_logic.php");
    include_once("../config/dbaccess.php");

    $sql = "INSERT INTO produkte (`name`, firma, preis, text, kurzbeschreibung, bild) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = mysqli_prepare($db, $sql);
    mysqli_stmt_bind_param($stmt, "ssdsss", $name, $firma, $preis, $text, $kurzbeschreibung, $bild_new);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    mysqli_close($db);

    $response = array("success" => true);
}

return $response;
?>