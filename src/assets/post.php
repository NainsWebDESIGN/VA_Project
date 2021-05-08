<?php
header('Content-Type: application/json; charset=UTF-8'); //設定資料類型為 json，編碼 utf-8
if ($_SERVER['REQUEST_METHOD'] == "POST") { //如果是 POST 請求
    $data = array();
        $DB_server = "sql209.byethost6.com"; # 你的網域IP
        $DB_user = "b6_28438621"; # 你的帳號
        $DB_pass = "valleysawesome"; # 你的密碼
        $DB_name = "b6_28438621_VA_DB"; # 你的資料庫

    $connection = new mysqli($DB_server, $DB_user, $DB_pass, $DB_name);

    function three($table, $value1, $value2, $value3){
        return "INSERT INTO `$table` VALUES ('$value1', '$value2', '$value3')";
    }

    function five($table, $value1, $value2, $value3, $value4, $value5){
        return "INSERT INTO `$table` VALUES ('$value1', '$value2', '$value3', '$value4', '$value5')";
    }

    if($connection -> connect_error){
        $data = array( 'ret' => $connection -> connect_error );
    }else{

        if($connection->query(three('service_year', 'year', '年標題1', 'Free')) === TRUE){}
        else{ $data = array('ret' => $connection -> connect_error); }
        if($connection->query(three('service_year', 'year', '年標題2', '14910')) === TRUE){}
        else{ $data = array('ret' => $connection -> connect_error); }
        if($connection->query(three('service_year', 'year', '年標題3', '28620')) === TRUE){}
        else{ $data = array('ret' => $connection -> connect_error); }
        if($connection->query(three('service_year', 'year', '年標題4', '39430')) === TRUE){}
        else{ $data = array('ret' => $connection -> connect_error); }

        if($connection->query(five(
            'year_content', 
            '條件1', 
            '條件2', 
            '條件3', 
            '',
            '年標題1'
            )) === TRUE){}
        else{ $data = array('ret' => $connection -> connect_error); }
        if($connection->query(five(
            'year_content', 
            '條件1', 
            '條件2', 
            '條件3', 
            '條件4',
            '年標題2'
            )) === TRUE){}
        else{ $data = array('ret' => $connection -> connect_error); }
        if($connection->query(five(
            'year_content', 
            '條件1', 
            '條件2', 
            '條件3', 
            '條件4',
            '年標題3'
            )) === TRUE){}
        else{ $data = array('ret' => $connection -> connect_error); }
        if($connection->query(five(
            'year_content', 
            '條件1', 
            '條件2', 
            '條件3', 
            '條件4',
            '年標題4'
            )) === TRUE){ $data = array('ret' => 'OK'); }
        else{ $data = array('ret' => $connection -> connect_error); }
    }
    echo json_encode($data);
} else {
    //回傳 errorMsg json 資料
        $data = array( 'errorMsg' => '請求無效，只允許 POST 方式訪問！' );
    echo json_encode($data);
}
?>