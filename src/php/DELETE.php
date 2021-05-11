<?php
header('Content-Type: application/json; charset=UTF-8'); //設定資料類型為 json，編碼 utf-8
if ($_SERVER['REQUEST_METHOD'] == "POST") { //如果是 POST 請求
    require 'function.php';

    @$page = $_POST['page'];
    @$delete = $_POST['delete'];
    $item = delPage($page, $delete);

    $DB_server = "sql209.byethost6.com"; # 你的網域IP
    $DB_user = "b6_28438621"; # 你的帳號
    $DB_pass = "valleysawesome"; # 你的密碼
    $DB_name = "b6_28438621_VA_DB"; # 你的資料庫

    $connection = new mysqli($DB_server, $DB_user, $DB_pass, $DB_name);

    if ($connection->connect_error) {
        $data = array('ret' => $connection->connect_error);
    } else {
        if ($result = $connection->query(DEL($item[0], $item[1], $page))) {
            $data = array('ret' => 'OK');
        } else {
            $data = array('ret' => $connection->error);
        }
        $result->close();
    }

    echo json_encode($data);
} else {
    //回傳 errorMsg json 資料
    $data = array('ret' => '請求無效，只允許 POST 方式訪問！');
    echo json_encode($data);
}
