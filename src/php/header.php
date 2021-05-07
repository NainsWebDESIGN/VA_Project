<?php
header('Content-Type: application/json; charset=UTF-8'); //設定資料類型為 json，編碼 utf-8
if ($_SERVER['REQUEST_METHOD'] == "POST") { //如果是 POST 請求
    $data = array();
    $DB_server = "sql209.byethost6.com"; # 你的網域IP
    $DB_user = "b6_28438621"; # 你的帳號
    $DB_pass = "valleysawesome"; # 你的密碼
    $DB_name = "b6_28438621_VA_DB"; # 你的資料庫

    $connection = new mysqli($DB_server, $DB_user, $DB_pass, $DB_name);

    $header = "header"; #資料表名稱
    $content = "headerContent"; #資料表名稱
    $sqlHeader = "SELECT * FROM $header;"; #查詢資料表
    $sqlContent = "SELECT * FROM $content;"; #查詢資料表

    if($connection -> connect_error){
        $data = array( 'failed' => $connection -> connect_error );
    }else{
        // $data = array( 'succes' => "成功連線到資料庫" );
        if($result = $connection->query($sqlHeader)){
            while($row = $result->fetch_row()){
                array_push($data, array('href' => $row[0], 'title' => $row[1], 'content' => array()));
            }
        }else{
            $data = array( 'selectFailed' => $connection->error );
        }
        if($result = $connection->query($sqlContent)){
            while($row = $result->fetch_row()){
                switch($row[0]){
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