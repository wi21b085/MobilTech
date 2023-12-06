<?php

$host = "localhost";
$user = "mobiltechadmin";
$pw = "mobiltechadmin";
$dbname = "mobiltechdb";

$db = new mysqli($host, $user, $pw, $dbname);

if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
    /*Connection failed: Unable to connect to the database. Check your connection parameters.*/

}