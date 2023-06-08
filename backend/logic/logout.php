<?php
session_start();

if (isset($_COOKIE['username'])) {
    unset($_COOKIE['username']);
    setcookie('username', null, -1, '/');
    $res["success"] = true;
    session_destroy();
    session_start();
} else {
    $res["success"] = false;
}