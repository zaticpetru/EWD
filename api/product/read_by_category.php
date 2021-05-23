<?php 
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    
    include_once '../../config/database.php';
    include_once '../../objects/product.php';

    $database = new Database();
    $db = $database->getConnection();

    $product = new Product($db);
    $product->category_id = isset($_GET['id']) ? $_GET['id'] : die();

    $result = $product->readByCategory();
    $count = $result->rowCount();

    if($count > 0) {
        $products_array = array();
        $products_array["category_name"] = array();
        $products_array["records"] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $product_item = array(
                "id" => $id,
                "name" => $name,
                "description" => html_entity_decode($description),
                "price" => $price,
                "category_id" => $category_id,
                "category_name" => $category_name
            );

            array_push($products_array["records"], $product_item);
        }

        $products_array["category_name"] =  $products_array["records"][0]["category_name"];

        http_response_code(200);
        echo json_encode($products_array);
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "No products found."));
    }
?>