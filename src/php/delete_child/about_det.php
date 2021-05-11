<?php
require '../DELETE.php';
require '../function.php';

$data = array();
$DB_server = "sql209.byethost6.com"; # 你的網域IP
$DB_user = "b6_28438621"; # 你的帳號
$DB_pass = "valleysawesome"; # 你的密碼
$DB_name = "b6_28438621_VA_DB"; # 你的資料庫

$connection = new mysqli($DB_server, $DB_user, $DB_pass, $DB_name);

$keys = explode(',', $delete);

if ($connection->connect_error) {
    $data = array('ret' => $connection->connect_error);
} else {
    for ($i = 0; $i < count($keys); $i++) {
        switch ($page) {
            case 'aboutTeam':
                if ($result = $connection->query(DEL('about', $keys[$i]))) {
                    $data = array('ret' => 'OK');
                } else {
                    $data = array('ret' => $connection->error);
                }
                break;
            case 'aboutPlace':
                if ($result = $connection->query(INS('about_three', $keys[$i]))) {
                    $data = array('ret' => 'OK');
                } else {
                    $data = array('ret' => $connection->error);
                }
                break;
        }
    }
    $result->close();
}
$connection->close();
