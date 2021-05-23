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

        public function productCount($categoryId) {
            if($sqlQuery = $this->conn->prepare("
                SELECT
                    COUNT(id) as total_rows
                FROM
                    ". $this->products_table_name ."
                WHERE
                    category_id = :id
            ")) {
                $sqlQuery->bindParam(":id", $categoryId);

                $sqlQuery->execute();

                $row = $sqlQuery->fetch(PDO::FETCH_ASSOC);

                return $row['total_rows'];
            }
            return 0;
        }

        public function readOne(){
            if($sqlQuery = $this->conn->prepare("
                SELECT 
                    id,
                    name,
                    description
                FROM
                    ". $this->table_name ."
                WHERE
                    id = :id
                LIMIT
                    0,1
            ")) {
                $sqlQuery->bindParam(":id", $this->id);

                $sqlQuery->execute();
                $row = $sqlQuery->fetch(PDO::FETCH_ASSOC);
                if($row) {
                    $this->name = $row['name'];
                    $this->description = $row['description'];
                }
            }
        }
    }
?>