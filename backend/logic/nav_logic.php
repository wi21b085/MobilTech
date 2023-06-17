<?php
session_start();

if (isset($_SESSION['rolle']) && isset($_COOKIE["username"])) {

    if ($_SESSION['rolle'] == 'admin') {
        require_once('../../frontend/sites/navbar-admin.html');
    } else if ($_SESSION['rolle'] == 'user') {
        require_once('../../frontend/sites/navbar-user.html');
    }
}else{
    require_once('../../frontend/sites/navbar-guest.html');
}
