<?php
header('Content-Type: application/json; charset=UTF-8'); //設定資料類型為 json，編碼 utf-8
if ($_SERVER['REQUEST_METHOD'] == "POST") { //如果是 POST 請求
    require 'function.php';

    $data = array();


    if ($conn->connect_error) {
        $data = array('ret' => $conn->connect_error);
    } else {
        // $data = array( 'succes' => "成功連線到資料庫" );
        $data[0] = array();
        if ($result = $conn->query(SEL("service"))) {
            while ($row = $result->fetch_row()) {
                array_push($data[0], array('title' => $row[0], 'style' => $row[1], 'content' => $row[2]));
            }
        } else {
            $data = array('ret' => $conn->error);
        }
        $data[1] = array('left' => array(), 'right' => array());

        if ($result = $conn->query(SEL("service_left"))) {
            while ($row = $result->fetch_row()) {
                array_push($data[1]["left"], array('title' => $row[0], 'percentage' => $row[1]));
            }
        } else {
            $data = array('ret' => $conn->error);
        }
        if ($result = $conn->query(SEL("service_right"))) {
            while ($row = $result->fetch_row()) {
                array_push($data[1]["right"], array('title' => $row[0], 'percentage' => $row[1]));
            }
        } else {
            $data = array('ret' => $conn->error);
        }
        $data[2] = array();
        if ($result = $conn->query(SEL("project"))) {
            while ($row = $result->fetch_row()) {
                array_push($data[2], array('title' => $row[0], 'type' => $row[1], 'image' => $row[2], 'content' => $row[3]));
            }
        } else {
            $data = array('ret' => $conn->error);
        }
        $data[3] = array('month' => array(), 'year' => array());
        if ($result = $conn->query(SEL("service_month"))) {
            while ($row = $result->fetch_row()) {
                array_push($data[3]["month"], array('type' => $row[0], 'title' => $row[1], 'price' => $row[2], 'content' => array()));
            }
        } else {
            $data = array('ret' => $conn->error);
        }
        if ($result = $conn->query(SEL("service_year"))) {
            while ($row = $result->fetch_row()) {
                array_push($data[3]["year"], array('type' => $row[0], 'title' => $row[1], 'price' => $row[2], 'content' => array()));
            }
        } else {
            $data = array('ret' => $conn->error);
        }
        if ($result = $conn->query(SEL("month_content"))) {
            while ($row = $result->fetch_row()) {
                for ($i = 0; $i < count($data[3]["month"]); $i++) {
                    if ($data[3]["month"][$i]["title"] == $row[4]) {
                        $data[3]["month"][$i]["content"] = array($row[0], $row[1], $row[2], $row[3]);
                    }
                }
            }
        } else {
            $data = array('ret' => $conn->error);
        }
        if ($result = $conn->query(SEL("year_content"))) {
            while ($row = $result->fetch_row()) {
                for ($i = 0; $i < count($data[3]["year"]); $i++) {
                    if ($data[3]["year"][$i]["title"] == $row[4]) {
                        $data[3]["year"][$i]["content"] = array($row[0], $row[1], $row[2], $row[3]);
                    }
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
