<?php 
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include_once '../../config/database.php';
    include_once '../../objects/category.php';

    $database = new Database();
    $db = $database->getConnection();

    $category = new Category($db);

    $result = $category->readAll();
    $count = $result->rowCount();

    if($count > 0) {
        $categories_array = array();
        $categories_array['records'] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $category_item = array(
                "id" => $id,
                "name" => $name,
                "description" => html_entity_decode($description)
            );
            array_push($categories_array["records"], $category_item);
        }
        http_response_code(200);
        echo json_encode($categories_array);
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "No categories found."));
    }
?>