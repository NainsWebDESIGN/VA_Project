<?php
header('Content-Type: application/json; charset=UTF-8'); //設定資料類型為 json，編碼 utf-8
if ($_SERVER['REQUEST_METHOD'] == "POST") { //如果是 POST 請求

    @$page = $_POST['page'];

    switch ($page) {
        case "aboutTeam":
            @$delete = $_POST['delete'];
            require 'delete_child/about_det.php';
            break;
        case "aboutPlace":
            @$delete = $_POST['delete'];
            require 'delete_child/about_det.php';
            break;
    }

    echo json_encode($data);
} else {
    //回傳 errorMsg json 資料
    $data = array('ret' => '請求無效，只允許 POST 方式訪問！');
    echo json_encode($data);
}
