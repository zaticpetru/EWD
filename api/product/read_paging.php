<?php 
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include_once '../config/core.php';
    include_once '../shared/utilities.php';
    include_once '../config/database.php';
    include_once '../objects/product.php';

    $utilities = new Utilities();

    $database = new Database();
    $db = $database->getConnection();

    $product = new Product($db);

    $result = $product->readPaging($from_record_num, $records_per_page);
    $count = $result->rowCount();

    if($count > 0) {
        $products_array = array();
        $products_array["records"] = array();
        $products_array["paging"] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row); // to skip $row->id

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

        $total_rows = $product->count();
        $page_url = "{$home_url}/product/read_paging.php";
        $paging = $utilities->getPaging($page, $total_rows, $records_per_page, $page_url);
        
        $products_array["paging"] = $paging;

        http_response_code(200);
        echo json_encode($products_array);
    } else {
        http_response_code(200);
        echo json_encode(array("message" => "No products found."));
    }
?>