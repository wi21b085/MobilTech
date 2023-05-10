<?php
//include("../config/dbaccess.php");
class DataHandler
{

    public function register($param)
    {
        $data = json_decode($param);

        $anrede = $data->anrede;
        $vorname = $data->vorname;
        $nachname = $data->nachname;
        $username = $data->username;
        $email = $data->email;
        $password = $data->password;
        $password2 = $data->password2;
        $adresse = $data->adresse;
        $plz = $data->plz;
        $plz = intval($plz);
        $ort = $data->ort;

        $res = [];
        $res["url"] = "";
        $res["success"]  = false;
        include("../logic/register.php");
        return $res;
    }

    public function login($param)
    {;
    }

    public function logout()
    {;
    }
}
