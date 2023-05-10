<?php
/*if (str_contains($_SERVER['REQUEST_URI'], '/dbaccess.php')) {
    header("Location:../../frontend/index.html");
    die();
}*/

$host = "localhost";
$user = "mobiltechadmin";
$pw = "mobiltechadmin";
$dbname = "mobiltechdb";

$db = new mysqli($host, $user, $pw, $dbname);

if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}