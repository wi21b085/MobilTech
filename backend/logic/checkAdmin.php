<?php

session_start();
if (isset($_SESSION["rolle"])) {
    if ($_SESSION['rolle'] == 'admin') {
        $res["admin"] = true;
    }
}
