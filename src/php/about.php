<?php
header('Content-Type: application/json; charset=UTF-8'); //設定資料類型為 json，編碼 utf-8
if ($_SERVER['REQUEST_METHOD'] == "POST") { //如果是 POST 請求
    $data = array(array(), array(), array());
    $DB_server = "sql209.byethost6.com"; # 你的網域IP
    $DB_user = "b6_28438621"; # 你的帳號
    $DB_pass = "valleysawesome"; # 你的密碼
    $DB_name = "b6_28438621_VA_DB"; # 你的資料庫

    $connection = new mysqli($DB_server, $DB_user, $DB_pass, $DB_name);

    $about = "about"; #資料表名稱
    $aboutTwo = "about_two"; #資料表名稱
    $aboutThree = "about_three"; #資料表名稱
    $sqlAbout = "SELECT * FROM $about;"; #查詢資料表
    $sqlTwo = "SELECT * FROM $aboutTwo;"; #查詢資料表
    $sqlThree = "SELECT * FROM $aboutThree;"; #查詢資料表

    if ($connection->connect_error) {
        $data = array('failed' => $connection->connect_error);
    } else {
        // $data = array( 'succes' => "成功連線到資料庫" );
        if ($result = $connection->query($sqlAbout)) {
            while ($row = $result->fetch_row()) {
                array_push($data[0], array('name' => $row[0], 'type' => $row[1], 'content' => $row[2], 'pic' => $row[3]));
            }
        } else {
            $data = array('selectFailed' => $connection->error);
        }
        if ($result = $connection->query($sqlTwo)) {
            while ($row = $result->fetch_row()) {
                array_push($data[1], array('title' => $row[0], 'content' => $row[1]));
            }
        } else {
            $data = array('selectFailed' => $connection->error);
        }
        if ($result = $connection->query($sqlThree)) {
            while ($row = $result->fetch_row()) {
                array_push($data[2], array('name' => $row[0], 'content' => $row[1], 'style' => $row[2]));
            }
        } else {
            $data = array('selectFailed' => $connection->error);
        }
        $result->close();
    }
    $connection->close();
    echo json_encode($data);
} else {
    //回傳 errorMsg json 資料
    $data = array('errorMsg' => '請求無效，只允許 POST 方式訪問！');
    echo json_encode($data);
}
