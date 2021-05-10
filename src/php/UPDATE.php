<?php
header('Content-Type: application/json; charset=UTF-8'); //設定資料類型為 json，編碼 utf-8
if ($_SERVER['REQUEST_METHOD'] == "POST") { //如果是 POST 請求

    @$page = $_POST['page'];

    switch ($page) {
        case "aboutTeam":
            @$name = $_POST['name'];
            @$type = $_POST['type'];
            @$pic = $_POST['pic'];
            @$content = $_POST['content'];
            @$original = $_POST['original'];
            require 'update_child/about_upd.php';
            break;
        case "aboutPlace":
            @$name = $_POST['name'];
            @$style = $_POST['style'];
            @$content = $_POST['content'];
            @$original = $_POST['original'];
            require 'update_child/about_upd.php';
            break;
    }

    if ($page == "aboutTeam") {
        @$name = $_POST['name'];
        @$type = $_POST['type'];
        @$pic = $_POST['pic'];
        @$content = $_POST['content'];
        require 'insert_child/about_ins.php';
    } else if ($pa)
        echo json_encode($data);
} else {
    //回傳 errorMsg json 資料
    $data = array('ret' => '請求無效，只允許 POST 方式訪問！');
    echo json_encode($data);
}
