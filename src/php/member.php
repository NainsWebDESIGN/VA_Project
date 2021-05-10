<?php
header('Content-Type: application/json; charset=UTF-8'); //設定資料類型為 json，編碼 utf-8
if ($_SERVER['REQUEST_METHOD'] == "POST") { //如果是 POST 請求
    @$username = $_POST['username']; //取得 username POST 值
    @$password = $_POST['password']; //取得 password POST 值
    $data = array();
    $DB_server = "sql209.byethost6.com"; # 你的網域IP
    $DB_user = "b6_28438621"; # 你的帳號
    $DB_pass = "valleysawesome"; # 你的密碼
    $DB_name = "b6_28438621_VA_DB"; # 你的資料庫

    $connection = new mysqli($DB_server, $DB_user, $DB_pass, $DB_name);

    $Table = "member"; #資料表名稱
    $sqlTable = "SELECT * FROM $Table WHERE username = '" . $username . "' AND password = '" . $password . "';"; #查詢資料表
    $sqlInner = "INSERT INTO $Table (username, password) VALUES ('" . $username . "', '" . $password . "')"; # 新增Table裡的資料

    if ($connection->connect_error) {
        $data = array('failed' => $connection->connect_error);
    } else {
        if ($result = $connection->query($sqlTable)) {
            while ($row = $result->fetch_row()) {
                $db_username = $row[0];
                $db_password = $row[1];
            }
            $Check = $db_username == $username && $db_password == $password;
            if ($Check) {
                $data = array('login' => true);
            } else {
                $data = array('login' => false);
            }
            $result->close();
        } else {
            $data = array('selectFailed' => $connection->error);
        }
    }
    $connection->close();
    echo json_encode($data);
} else {
    //回傳 errorMsg json 資料
    $data = array('errorMsg' => '請求無效，只允許 POST 方式訪問！');
    echo json_encode($data);
}
