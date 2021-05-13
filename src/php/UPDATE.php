<?php
ini_set("display_errors", "on");
error_reporting(E_ALL & ~E_ERROR);
header('Content-Type: application/json; charset=UTF-8'); //設定資料類型為 json，編碼 utf-8
if ($_SERVER['REQUEST_METHOD'] == "POST") { //如果是 POST 請求
    require 'function.php';

    @$page = $_POST['page'];
    $Item = updPage($page);
    $data = array();

    if ($conn->connect_error) {
        $data = array('ret' => $conn->connect_error);
    } else {
        if ($result = $conn->query($Item)) {
            $data = array('ret' => 'OK');
        } else {
            $data = array('ret' => $conn->error);
        }
        $result->close();
    }
    $conn->close();

    echo json_encode($data);
} else {
    //回傳 errorMsg json 資料
    $data = array('ret' => '請求無效，只允許 POST 方式訪問！');
    echo json_encode($data);
}
