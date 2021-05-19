<?php 
    class User {
        private $connection;

        private $dbTable = "User";

        public $id;
        public $name;
        public $email;
        public $age;
        public $profile;
        public $created;

        public function __construct($db)
        {
            $this->connection = $db;
        }

        public function getUser($id) {
            if($sqlQuery = $this->connection->prepare('
                SELECT id, name, email, age, created
                FROM :userTable
                WHERE id = :id
                ')) {
                $sqlQuery->bind_param(':userTable', $this->dbTable);

                $id = filter_var($id, FILTER_SANITIZE_NUMBER_INT);
                $sqlQuery->execute(array(':userTable' => $this->dbTable, ':id' => $id));

                $sqlQuery->bind_param(':id', $id);


            }
        }
    }
?>

<!-- https://codeofaninja.com/2017/02/create-simple-rest-api-in-php.html -->
<!-- https://github.com/psswid/php-rest-api/blob/master/objects/Product.php -->