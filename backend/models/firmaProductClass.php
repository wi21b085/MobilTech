<?php 

    class firmaProductClass{
        
        public $name;
        public $firma;
        public $bild;
        public $kurzbeschreibung;
        
        function __construct( $name,$firma,$bild,  $kurzbeschreibung)
            {
               
               $this->name = $name;
               $this->firma = $firma;
               $this->bild = $bild;
               
               $this->kurzbeschreibung = $kurzbeschreibung;
               
               
            }
    }