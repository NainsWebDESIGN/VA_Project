<?php
header('Content-Type: application/json; charset=UTF-8'); //設定資料類型為 json，編碼 utf-8
if ($_SERVER['REQUEST_METHOD'] == "POST") { //如果是 POST 請求
    require 'function.php';

    $data = array(array(), array(), array());

    if ($conn->connect_error) {
        $data = array('ret' => $conn->connect_error);
    } else {
        // $data = array( 'succes' => "成功連線到資料庫" );
        if ($result = $conn->query(SEL('about'))) {
            while ($row = $result->fetch_row()) {
                array_push($data[0], array('name' => $row[0], 'type' => $row[1], 'content' => $row[2], 'pic' => $row[3]));
            }
        } else {
            $data = array('ret' => $conn->error);
        }
        if ($result = $conn->query(SEL('about_two'))) {
            while ($row = $result->fetch_row()) {
                array_push($data[1], array('title' => $row[0], 'content' => $row[1]));
            }
        } else {
            $data = array('ret' => $conn->error);
        }
        if ($result = $conn->query(SEL('about_three'))) {
            while ($row = $result->fetch_row()) {
                array_push($data[2], array('name' => $row[0], 'content' => $row[1], 'style' => $row[2]));
            }
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
