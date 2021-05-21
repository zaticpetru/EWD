<?php 
    class Category {

        private $conn;
        private $table_name = "categories";
        private $products_table_name = "products";

        public $id;
        public $name;
        public $description;
        public $created;

        public function __construct($db)
        {
            $this->conn = $db;
        }

        public function readAll() {
            if($sqlQuery = $this->conn->prepare("
                SELECT 
                id,
                name,
                description
            FROM
                ". $this->table_name ."
            ORDER BY
                name
            ")) {

                $sqlQuery->execute();
                return $sqlQuery;
            }
            return null;
        }
    }
?>