<?php
header('Content-Type: application/json; charset=UTF-8'); //設定資料類型為 json，編碼 utf-8
if ($_SERVER['REQUEST_METHOD'] == "POST") { //如果是 POST 請求
    $data = array();
    $DB_server = "sql209.byethost6.com"; # 你的網域IP
    $DB_user = "b6_28438621"; # 你的帳號
    $DB_pass = "valleysawesome"; # 你的密碼
    $DB_name = "b6_28438621_VA_DB"; # 你的資料庫

    $connection = new mysqli($DB_server, $DB_user, $DB_pass, $DB_name);

    function sqlText($Table)
    {
        return "SELECT * FROM `$Table`;";
    }

    if ($connection->connect_error) {
        $data = array('failed' => $connection->connect_error);
    } else {
        // $data = array( 'succes' => "成功連線到資料庫" );
        $data[0] = array();
        if ($result = $connection->query(sqlText("service"))) {
            while ($row = $result->fetch_row()) {
                array_push($data[0], array('title' => $row[0], 'style' => $row[1], 'content' => $row[2]));
            }
        } else {
            $data = array('Failed' => $connection->error);
        }
        $data[1] = array('left' => array(), 'right' => array());

        if ($result = $connection->query(sqlText("service_left"))) {
            while ($row = $result->fetch_row()) {
                array_push($data[1]["left"], array('title' => $row[0], 'percentage' => $row[1]));
            }
        } else {
            $data = array('Failed' => $connection->error);
        }
        if ($result = $connection->query(sqlText("service_right"))) {
            while ($row = $result->fetch_row()) {
                array_push($data[1]["right"], array('title' => $row[0], 'percentage' => $row[1]));
            }
        } else {
            $data = array('Failed' => $connection->error);
        }
        $data[2] = array();
        if ($result = $connection->query(sqlText("project"))) {
            while ($row = $result->fetch_row()) {
                array_push($data[2], array('title' => $row[0], 'type' => $row[1], 'image' => $row[2], 'content' => $row[3]));
            }
        } else {
            $data = array('Failed' => $connection->error);
        }
        $data[3] = array('month' => array(), 'year' => array());
        if ($result = $connection->query(sqlText("service_month"))) {
            while ($row = $result->fetch_row()) {
                array_push($data[3]["month"], array('type' => $row[0], 'title' => $row[1], 'price' => $row[2], 'content' => array()));
            }
        } else {
            $data = array('Failed' => $connection->error);
        }
        if ($result = $connection->query(sqlText("service_year"))) {
            while ($row = $result->fetch_row()) {
                array_push($data[3]["year"], array('type' => $row[0], 'title' => $row[1], 'price' => $row[2], 'content' => array()));
            }
        } else {
            $data = array('Failed' => $connection->error);
        }
        if ($result = $connection->query(sqlText("month_content"))) {
            while ($row = $result->fetch_row()) {
                for ($i = 0; $i < count($data[3]["month"]); $i++) {
                    if ($data[3]["month"][$i]["title"] == $row[4]) {
                        $data[3]["month"][$i]["content"] = array($row[0], $row[1], $row[2], $row[3]);
                    }
                }
            }
        } else {
            $data = array('Failed' => $connection->error);
        }
        if ($result = $connection->query(sqlText("year_content"))) {
            while ($row = $result->fetch_row()) {
                for ($i = 0; $i < count($data[3]["year"]); $i++) {
                    if ($data[3]["year"][$i]["title"] == $row[4]) {
                        $data[3]["year"][$i]["content"] = array($row[0], $row[1], $row[2], $row[3]);
                    }
                }
            }
        } else {
            $data = array('Failed' => $connection->error);
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
