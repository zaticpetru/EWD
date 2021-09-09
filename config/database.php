<?php
    class Database {
        private $host = "localhost";
        private $db = "ewd_database";
        private $username  = "root";
        private $password = "";
        private $options = array(
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        );

        public $connection;

        public function getConnection() {
            $this->connection = null;
            try {
                $this->connection = new PDO("mysql:host=$this->host;dbname=$this->db",
                                        $this->username,
                                        $this->password,
                                        $this->options);
                $this->connection->exec("set names utf8");
            } catch(PDOException $exception) {
                echo "Database not connected: " . $exception->getMessage();
            }

            return $this->connection;
        }
    }
?>