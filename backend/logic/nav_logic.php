<?php
session_start();
//$_SESSION['role'] = 'admin';

if (isset($_SESSION['role'])) {

    if ($_SESSION['role'] == 'admin') {
        require_once('../../frontend/sites/navbar-admin.html');
    } else if ($_SESSION['role'] == 'user') {
        require_once('../../frontend/sites/navbar-user.html');
    }
}else{
    require_once('../../frontend/sites/navbar-guest.html');
}
?>