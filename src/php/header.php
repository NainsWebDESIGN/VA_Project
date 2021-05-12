<?php
header('Content-Type: application/json; charset=UTF-8'); //設定資料類型為 json，編碼 utf-8
if ($_SERVER['REQUEST_METHOD'] == "POST") { //如果是 POST 請求
    require 'function.php';

    $data = array();

    if ($conn->connect_error) {
        $data = array('ret' => $conn->connect_error);
    } else {
        // $data = array( 'succes' => "成功連線到資料庫" );
        if ($result = $conn->query(SEL("header"))) {
            while ($row = $result->fetch_row()) {
                array_push($data, array('href' => $row[0], 'title' => $row[1], 'content' => array()));
            }
        } else {
            $data = array('ret' => $conn->error);
        }
        if ($result = $conn->query(SEL("headerContent"))) {
            while ($row = $result->fetch_row()) {
                switch ($row[0]) {
                    case 'About':
                        array_push($data[0]["content"], array("name" => $row[1], "route" => $row[2]));
                        break;
                    case 'Mess':
                        array_push($data[1]["content"], array("name" => $row[1], "route" => $row[2]));
                        break;
                    case 'Ser':
                        array_push($data[2]["content"], array("name" => $row[1], "route" => $row[2]));
                        break;
                    case 'Con':
                        array_push($data[3]["content"], array("name" => $row[1], "route" => $row[2]));
                        break;
                }
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
