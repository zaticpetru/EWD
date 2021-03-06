<?php 
    class Product{
        private $conn;
        private $table_name = "products";
        private $category_table_name = "categories";

        public $id;
        public $name;
        public $description;
        public $price;
        public $category_id;
        public $category_name;
        public $created;

        public function __construct($db)
        {
            $this->conn = $db;
        }

        public function readAll() {
            if($sqlQuery = $this->conn->prepare("
                SELECT 
                    c.name as category_name,
                    p.id,
                    p.name,
                    p.description,
                    p.price,
                    p.category_id,
                    p.created
                FROM ". $this->table_name ." as p
                LEFT JOIN ". $this->category_table_name ." as c
                ON p.category_id = c.id
                ORDER BY
                    p.created DESC
                ")) {

                $sqlQuery->execute();
                
                return $sqlQuery;
            }
            return null;
        }

        public function create() {
            if($sqlQuery = $this->conn->prepare("
                INSERT INTO
                ". $this->table_name ."
                SET
                    name = :name,
                    price = :price,
                    description = :description,
                    category_id = :category_id,
                    created = :created
            ")) {
                $this->name     = htmlspecialchars(strip_tags($this->name));
                $this->price    = htmlspecialchars(strip_tags($this->price));
                $this->description = htmlspecialchars(strip_tags($this->description));
                $this->category_id = htmlspecialchars(strip_tags($this->category_id));
                $this->created  = htmlspecialchars(strip_tags($this->created));

                $sqlQuery->bindParam(":name", $this->name);
                $sqlQuery->bindParam(":price", $this->price);
                $sqlQuery->bindParam(":description", $this->description);
                $sqlQuery->bindParam(":category_id", $this->category_id);
                $sqlQuery->bindParam(":created", $this->created);

                try {
                    $this->conn->beginTransaction();

                    $sqlQuery->execute();
                    $this->id = $this->conn->lastInsertId();
                    $this->readOne();

                    $this->conn->commit();

                } catch(PDOException $e) {
                    $this->conn->rollback();

                    print "Error!: " . $e->getMessage() . "</br>";

                    return false;
                }
                return true;
            }
            return false;
        }

        public function readOne(){
            if($sqlQuery = $this->conn->prepare("
                SELECT 
                    c.name as category_name,
                    p.id,
                    p.name,
                    p.description,
                    p.price,
                    p.category_id,
                    p.created
                FROM ". $this->table_name ." as p
                LEFT JOIN ". $this->category_table_name ." as c
                ON p.category_id = c.id
                WHERE
                    p.id = :id
                LIMIT
                    0,1
            ")) {
                $sqlQuery->bindParam(":id", $this->id);

                $sqlQuery->execute();
                $row = $sqlQuery->fetch(PDO::FETCH_ASSOC);

                if($row) {
                    $this->name = $row['name'];
                    $this->price = $row['price'];
                    $this->description = $row['description'];
                    $this->category_id = $row['category_id'];
                    $this->category_name = $row['category_name'];
                }
            }
        }

        public function update() {
            if($sqlQuery = $this->conn->prepare("
                UPDATE
                    ". $this->table_name ."
                SET
                    name = :name,
                    price = :price,
                    description = :description,
                    category_id = :category_id
                WHERE
                    id = :id
            ")) {
                $this->name     = htmlspecialchars(strip_tags($this->name));
                $this->price    = htmlspecialchars(strip_tags($this->price));
                $this->description = htmlspecialchars(strip_tags($this->description));
                $this->category_id = htmlspecialchars(strip_tags($this->category_id));
                
                $sqlQuery->bindParam(":id", $this->id);
                $sqlQuery->bindParam(":name", $this->name);
                $sqlQuery->bindParam(":price", $this->price);
                $sqlQuery->bindParam(":description", $this->description);
                $sqlQuery->bindParam(":category_id", $this->category_id);

                if($sqlQuery->execute()) {
                    return true;
                }
            }
            return false;
        }

        public function delete(){
            if($sqlQuery = $this->conn->prepare("
                DELETE FROM
                    ". $this->table_name ."
                WHERE
                    id = :id
            ")) {
                $sqlQuery->bindParam(":id", $this->id);
                
                if($sqlQuery->execute()) {
                    return true;
                }
            }
            return false;
        }

        public function search($keywords){
            if($sqlQuery = $this->conn->prepare("
                SELECT 
                    c.name as category_name,
                    p.id,
                    p.name,
                    p.description,
                    p.price,
                    p.category_id,
                    p.created
                FROM ". $this->table_name ." as p
                LEFT JOIN ". $this->category_table_name ." as c
                ON p.category_id = c.id
                WHERE
                    p.name LIKE :keywords OR
                    p.description LIKE :keywords OR
                    c.name LIKE :keywords
                ORDER BY
                    p.created DESC
            ")) {
                
                $keywords = htmlspecialchars(strip_tags($keywords));
                $keywords = "%{$keywords}%";

                $sqlQuery->bindParam(":keywords", $keywords);
                
                $sqlQuery->execute();
                return $sqlQuery;

            }
            return null;
        }

        public function readPaging($from_record_num, $records_per_page) {
            if($sqlQuery = $this->conn->prepare("
                SELECT
                    c.name as category_name,
                    p.id,
                    p.name,
                    p.description,
                    p.price,
                    p.category_id,
                    p.created
                FROM ". $this->table_name ." as p
                LEFT JOIN ". $this->category_table_name ." as c
                ON p.category_id = c.id
                ORDER BY
                    p.created DESC
                LIMIT :from, :nr_records;
            ")) {
                $sqlQuery->bindParam(":from", $from_record_num, PDO::PARAM_INT);
                $sqlQuery->bindParam(":nr_records", $records_per_page, PDO::PARAM_INT);

                $sqlQuery->execute();
                return $sqlQuery;
            }
            return null;
        }

        public function count() {
            if($sqlQuery = $this->conn->prepare("
                SELECT COUNT(id) as total_rows
                FROM ". $this->table_name ."
            ")) {
                $sqlQuery->execute();
                $row = $sqlQuery->fetch(PDO::FETCH_ASSOC);

                return $row['total_rows'];
            }
            return 0;
        }

        public function readByCategory() {
            if($sqlQuery = $this->conn->prepare("
                SELECT 
                    c.name as category_name,
                    p.id,
                    p.name,
                    p.description,
                    p.price,
                    p.category_id,
                    p.created
                FROM ". $this->table_name ." as p
                LEFT JOIN ". $this->category_table_name ." as c
                ON p.category_id = c.id
                WHERE
                    c.id = :id
            ")) {
                $sqlQuery->bindParam(":id", $this->category_id);

                $sqlQuery->execute();
                return $sqlQuery;
            }
            return null;
        }
    }
?>