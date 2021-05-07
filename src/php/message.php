<?php
header('Content-Type: application/json; charset=UTF-8'); //設定資料類型為 json，編碼 utf-8
if ($_SERVER['REQUEST_METHOD'] == "POST") { //如果是 POST 請求
    $data = array();
    $DB_server = "sql209.byethost6.com"; # 你的網域IP
    $DB_user = "b6_28438621"; # 你的帳號
    $DB_pass = "valleysawesome"; # 你的密碼
    $DB_name = "b6_28438621_VA_DB"; # 你的資料庫

    $connection = new mysqli($DB_server, $DB_user, $DB_pass, $DB_name);

    $message = "message"; #資料表名稱
    $sqlMessage = "SELECT * FROM $message;"; #查詢資料表

    if($connection -> connect_error){
        $data = array( 'failed' => $connection -> connect_error );
    }else{
        // $data = array( 'succes' => "成功連線到資料庫" );
        if($result = $connection->query($sqlMessage)){
            while($row = $result->fetch_row()){
                array_push($data, array(
                    'type' => $row[0], 'date' => $row[1], 'big_p' => $row[2],
                    'small_p' => $row[3], 'main_p' => $row[4], 'text' => $row[5],
                    'readStyle' => $row[6], 'title' => $row[7], 'content' => $row[8],
                ));
            }
        }else{
            $data = array( 'selectFailed' => $connection->error );
        }
        $result->close();
    }
    $connection->close();
    echo json_encode($data);
} else {
    //回傳 errorMsg json 資料
        $data = array( 'errorMsg' => '請求無效，只允許 POST 方式訪問！' );
    echo json_encode($data);
}
?>