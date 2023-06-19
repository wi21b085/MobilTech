<?php 

    class verlaufClass{
        public $id;
        public $order_id;
        public $produkt_id;
        public $menge;
        public $preis;
        
        function __construct($id, $order_id, $produkt_id, $menge, $preis)
            {
               $this->id = $id;
               $this->order_id = $order_id;
               $this->produkt_id = $produkt_id;
               $this->menge = $menge;
               $this->preis = $preis;
            }
    }