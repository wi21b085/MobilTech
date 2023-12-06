<?php
// logic für register.html

/*
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    header("Location: ../../");
    die();
} //Wenn kein POST (direkt über URL), dann weiterleiten
*/
session_start();

$errors = [];
$errors["vorname"] = false;
$errors["nachname"] = false;
$errors["username"] = false;
$errors["email"] = false;
$errors["password"] = false;
$errors["password2"] = false;
$errors["adresse"] = false;
$errors["plz"] = false;
$errors["ort"] = false;
$_SESSION["errors"] = $errors;

//if ($_SERVER["REQUEST_METHOD"] == "POST") { //Fehlermeldungen bei keinen Eingaben
if (empty($vorname)) {
    $errors["vorname"] = true;
    unset($_SESSION["s_vorname"]);
} else {
    $_SESSION["s_vorname"] = $vorname;
}
if (empty($nachname)) {
    $errors["nachname"] = true;
    unset($_SESSION["s_nachname"]);
} else {
    $_SESSION["s_nachname"] = $nachname;
}
if (empty($username)) {
    $errors["username"] = true;
    unset($_SESSION["s_username"]);
} else {
    $_SESSION["s_username"] = $username;
}
if (empty($email)) {
    $errors["email"] = true;
    unset($_SESSION["s_email"]);
} else {
    $_SESSION["s_email"] = $email;
}
if (empty($password)) {
    $errors["password"] = true;
    $_SESSION["pw_err"] = true;
}
if (empty($password2)) {
    $errors["password2"] = true;
    $_SESSION["pw_err"] = true;
}
if ($password !== $password2) {
    $errors["password"] = true;
    $errors["password2"] = true;
}
if (empty($adresse)) {
    $errors["adresse"] = true;
    unset($_SESSION["s_adresse"]);
} else {
    $_SESSION["s_adresse"] = $adresse;
}
if (empty($plz)) {
    $errors["plz"] = true;
    unset($_SESSION["s_plz"]);
} else {
    $_SESSION["s_plz"] = $plz;
}
if (empty($ort)) {
    $errors["ort"] = true;
    unset($_SESSION["s_ort"]);
} else {
    $_SESSION["s_ort"] = $ort;
}
if (in_array(true, $errors)) {
    $_SESSION["errors"] = $errors;
    $res["url"] = "../../frontend/sites/register.html?err1";
    $res["success"] = false;
    return $res;
    die();
} else {
    unset($_SESSION["errors"]);
}



$anrede = $anrede;
$vorname = trim($vorname);
$nachname = trim($nachname);
$username = trim($username);
$email = trim($email);
$password = trim($password);
$adresse = trim($adresse);
$plz = trim($plz);
$ort = trim($ort);

$uppercase = preg_match('@[A-Z]@', $password);
$lowercase = preg_match('@[a-z]@', $password);
$number    = preg_match('@[0-9]@', $password);
$specialChars = preg_match('@[^\w]@', $password);
$pw_err = false;
//Passwort-Policy checken
if ($uppercase == false || $lowercase == false || $number == false || $specialChars  == false || strlen($password) < 8) {
    $_SESSION["pw_err"] = true;
    $pw_err = true;
}
$empty = false;
if (strlen($vorname) === 0 || strlen($nachname) === 0 || strlen($username) === 0 || strlen($adresse) === 0 || strlen($ort) === 0) {  //Fehlermeldungen wenn Eingaben nur Leerzeichen
    $_SESSION["s_vorname"] = $vorname;
    $_SESSION["s_nachname"] = $nachname;
    $_SESSION["s_username"] = $username;
    $_SESSION["s_email"] = $email;
    $_SESSION["s_adresse"] = $adresse;
    $_SESSION["s_ort"] = $ort;
    if (strlen($vorname) === 0) {
        $errors["vorname"] = true;
        unset($_SESSION["s_vorname"]);
        $empty = true;
    }
    if (strlen($nachname) === 0) {
        $errors["nachname"] = true;
        unset($_SESSION["s_nachname"]);
        $empty = true;
    }
    if (strlen($username) === 0) {
        $errors["username"] = true;
        unset($_SESSION["s_username"]);
        $empty = true;
    }
    if (strlen($adresse) === 0) {
        $errors["adresse"] = true;
        unset($_SESSION["s_adresse"]);
        $empty = true;
    }
    if (strlen($ort) === 0) {
        $errors["ort"] = true;
        unset($_SESSION["s_ort"]);
        $empty = true;
    }
    $_SESSION["errors"] = $errors;
    $_SESSION["err_empty"] = true;
}

if ($pw_err || $empty) {
    $res["url"] = "../signup.php?err2";
    $res["success"] = false;
    return $res;
    die();
}

require_once("../config/dbaccess.php");

$users = $db->prepare('SELECT username, email From user');
$users->execute();
$result = $users->get_result();
//Überprüfung ob Mail und/oder Username schon vergeben
while ($row = $result->fetch_assoc()) {
    if ($row["username"] == $username && $row["email"] == $email) {
        $errors["username"] = true;
        unset($_SESSION["s_username"]);
        $errors["email"] = true;
        unset($_SESSION["s_email"]);
        $_SESSION['errors'] = $errors;
        $_SESSION["err_ue"] = true;

        $_SESSION["s_vorname"] = $vorname;
        $_SESSION["s_nachname"] = $nachname;
        $_SESSION["s_adresse"] = $adresse;
        $_SESSION["s_plz"] = $plz;
        $_SESSION["s_ort"] = $ort;

        $res["url"] = "../../frontend/sites/register.html?exists";
        $res["success"] = false;
        return $res;
        die();
    } elseif ($row["username"] == $username) {
        $errors["username"] = true;
        unset($_SESSION["s_username"]);
        $_SESSION['errors'] = $errors;
        $_SESSION["err_u"] = true;

        $_SESSION["s_vorname"] = $vorname;
        $_SESSION["s_nachname"] = $nachname;
        $_SESSION["s_adresse"] = $adresse;
        $_SESSION["s_email"] = $email;
        $_SESSION["s_plz"] = $plz;
        $_SESSION["s_ort"] = $ort;

        $res["url"] = "../../frontend/sites/register.html?uTaken";
        $res["success"] = false;
        return $res;
        die();
    } elseif ($row["email"] == $email) {
        $errors["email"] = true;
        unset($_SESSION["s_email"]);
        $_SESSION['errors'] = $errors;
        $_SESSION["err_e"] = true;

        $_SESSION["s_vorname"] = $vorname;
        $_SESSION["s_nachname"] = $nachname;
        $_SESSION["s_adresse"] = $username;
        $_SESSION["s_username"] = $email;
        $_SESSION["s_plz"] = $plz;
        $_SESSION["s_ort"] = $ort;

        $res["url"] = "../../frontend/sites/register.html?eTaken";
        $res["success"] = false;
        return $res;
        die();
    }
}

$password = htmlspecialchars($password, ENT_QUOTES);
$password = password_hash($password, PASSWORD_DEFAULT);

$vorname = htmlspecialchars($vorname, ENT_QUOTES);
$nachname = htmlspecialchars($nachname, ENT_QUOTES);
$username = htmlspecialchars($username, ENT_QUOTES);
$email = htmlspecialchars($email, ENT_QUOTES);
$adresse = htmlspecialchars($adresse, ENT_QUOTES);
$plz = htmlspecialchars($plz, ENT_QUOTES);
$ort = htmlspecialchars($ort, ENT_QUOTES);

$stmt = $db->prepare("INSERT INTO user (`anrede`, `vorname`, `nachname`, `username`, `email`, `password`, `adresse`, `plz`, `ort`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
//sql injection und script-schutz
$stmt->bind_param("sssssssis", $anrede, $vorname, $nachname, $username, $email, $password, $adresse, $plz, $ort);

$stmt->execute();

$stmt->close();
$db->close();

session_destroy();
session_start();
$_SESSION["signup_ok"] = true;

$res["url"] = "../../frontend/sites/login.html";
$res["success"] = true;
