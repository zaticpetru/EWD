<?php 
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: access");
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Allow-Credentials: true");
    header('Content-Type: application/json');

    include_once '../../config/database.php';
    include_once '../../objects/category.php';

    $database = new Database();
    $db = $database->getConnection();

    $category = new Category($db);
    $category->id = isset($_GET['id']) ? $_GET['id'] : die();
    $category->readOne();

    if($category->name != null) {
        $category_array = array(
            "id" =>  $category->id,
            "name" => $category->name,
            "description" => $category->description,
        );

        http_response_code(200);
        echo json_encode($category_array);
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "Category not found."));
    }
?>