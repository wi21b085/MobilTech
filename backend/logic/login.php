<?php
/*if ($_SERVER["REQUEST_METHOD"] != "POST") {
    header("Location: ../index.php");
    die();
}*/
session_start();

$errors = [];
$errors["si_username"] = false;
$errors["si_password"] = false;
$_SESSION["si_errors"] = $errors;


if (empty($username) || empty($password)) {
    if (empty($username)) {
        $errors["si_username"] = true;
        $_SESSION["si_errors"] = $errors;
    } else {
        $_SESSION["si_username"] = $username;
    }
    if (empty($password)) {
        $errors["si_password"] = true;
        $_SESSION["si_errors"] = $errors;
    }
    $res["url"] = "../../frontend/sites/login.html?empty";
    die();
}

require_once('../config/dbaccess.php');
$tab = [];
$sql = $db->prepare("SELECT id,username, vorname,nachname,password, status, admin, email FROM `user` WHERE `username`=? OR `email` =? ");
$sql->bind_param("ss", $username, $username);
$sql->execute();
$sql->store_result();
$sql->bind_result($tab["id"], $tab["username"], $tab["vorname"], $tab["nachname"], $tab["password"], $tab["status"], $tab["admin"], $tab["email"]);
$sql->fetch();
$sql->close();
$db->close();

$id = $tab["id"];
$admin = $tab["admin"];
$vorname = $tab["vorname"];
$nachname = $tab["nachname"];
$name = $vorname . " " . $nachname;
$rolle;
if ($admin == 1) {
    $rolle = "admin";
} elseif ($admin == 0) {
    $rolle = "user";
}

$username = $tab["username"];

if (
    $tab["status"] == TRUE &&
    (
        ($tab["username"] == $username && password_verify($password, $tab["password"])) ||
        ($tab["email"] == $username && password_verify($password, $tab["password"]))
    )
) { //wenn konto aktiv, dann einloggen
    $_SESSION["username"] = $tab["username"];
    $_SESSION["id"] = $id;
    $_SESSION["rolle"] = $rolle;
    $_SESSION["name"] = $name;

    if($check){
        setcookie('username', $username, time() + (86400 * 30), '/');
    } else {
        setcookie('username', $username, time() + 3600, '/');
    }

    $res["url"] = "../../frontend/sites/profil.html?correct";
    $res["success"] = true;
} elseif ($tab["username"] == $username && password_verify($password, $tab["password"]) && $tab["status"] == FALSE) { //wenn status inaktiv, dann kein login
    $_SESSION['error_status'] = true;
    $res["url"] = "../../frontend/sites/login.html?inactive";
} else {
    $_SESSION['error'] = true;
    $res["url"] = "../../frontend/sites/login.html?wrongUorP";
}
