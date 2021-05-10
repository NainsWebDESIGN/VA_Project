<?php
require '../INSERT.php';

$data = array();
$DB_server = "sql209.byethost6.com"; # 你的網域IP
$DB_user = "b6_28438621"; # 你的帳號
$DB_pass = "valleysawesome"; # 你的密碼
$DB_name = "b6_28438621_VA_DB"; # 你的資料庫

$connection = new mysqli($DB_server, $DB_user, $DB_pass, $DB_name);
require '../function.php';

if ($connection->connect_error) {
    $data = array('ret' => $connection->connect_error);
} else {
    switch ($page) {
        case 'aboutTeam':
            // $data = array( 'succes' => "成功連線到資料庫" );
            if ($result = $connection->query(UPD('about', $original, $name, $type, $pic, $content))) {
                $data = array('ret' => 'OK');
            } else {
                $data = array('ret' => $connection->error);
            }
            $result->close();
            break;
        case 'aboutPlace':
            // $data = array( 'succes' => "成功連線到資料庫" );
            if ($result = $connection->query(UPD('about_three', $original, $name, $style, $content))) {
                $data = array('ret' => 'OK');
            } else {
                $data = array('ret' => $connection->error);
            }
            $result->close();
            break;
    }
}
$connection->close();
