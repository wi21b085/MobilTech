<?php 

    class customerClass{
        public $id;
        public $vorname;
        public $nachname;
        public $username;
        public $email;
        public $adresse;
        public $plz;
        public $ort;
        public $status;
        public $admin;
        
        function __construct($id, $vorname,$nachname,$username, $email, $adresse, $plz, $ort, $status, $admin)
            {
               $this->id = $id;
               $this->vorname = $vorname;
               $this->nachname = $nachname;
               $this->username = $username;
               $this->email = $email;
               $this->adresse = $adresse;
               $this->plz = $plz;
               $this->ort = $ort;
               $this->status = $status;
               $this->admin = $admin;
            }
    }