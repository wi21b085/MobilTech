<?php 

    class productClass{
        public $id;
        public $name;
        public $firma;
        public $bild;
        public $preis;
        public $kurzbeschreibung;
        public $text;
        public $bewertung;
        
        function __construct($id, $name,$firma,$bild, $preis, $kurzbeschreibung, $text, $bewertung)
            {
               $this->id = $id;
               $this->name = $name;
               $this->firma = $firma;
               $this->bild = $bild;
               $this->preis = $preis;
               $this->kurzbeschreibung = $kurzbeschreibung;
               $this->text = $text;
               $this->bewertung = $bewertung;
            }
    }