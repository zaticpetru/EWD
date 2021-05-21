<?php 
    class Utilities {
        public function getPaging($page,
                                $total_rows,
                                $records_per_page,
                                $page_url
            ){
            $paging_array = array();
            $paging_array['first'] = $page > 1 ? "{$page_url}?page=1" : "";
            $total_pages = ceil($total_rows / $records_per_page);
            $range = 2;

            $initial_num = $page - $range;
            $condition_limit_num = $page + $range + 1;

            $paging_array['pages'] = array();
            $page_count = 0;

            for($i = $initial_num; $i < $condition_limit_num; $i++) {
                if(($i > 0) && ($i <= $total_pages)) {
                    $paging_array['pages'][$page_count]["page"] = $i;
                    $paging_array['pages'][$page_count]["url"] = "{$page_url}?page={$i}";
                    $paging_array['pages'][$page_count]["current_page"] = $i == $page ? "true" : "false";

                    $page_count++;
                }
            }

            $paging_array['last'] = $page < $total_pages ? "{$page_url}?page={$total_pages}" : "";

            return $paging_array;
        }
    }
?>