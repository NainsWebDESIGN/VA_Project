<?php
ini_set("display_errors", "on");
error_reporting(E_ALL & ~E_ERROR);
$DB_server = "sql209.byethost6.com"; # 你的網域IP
$DB_user = "b6_28438621"; # 你的帳號
$DB_pass = "valleysawesome"; # 你的密碼
$DB_name = "b6_28438621_VA_DB"; # 你的資料庫

$conn = new mysqli($DB_server, $DB_user, $DB_pass, $DB_name);

function SEL($Table)
{
    return "SELECT * FROM `$Table`;";
}
function pageName()
{
    switch ($_POST['page']) {
        case 'aboutTeam':
        case 'aboutPlace':
            return '`name`';
        case 'Message':
            return '`title`';
    }
}
function DEL($Table, $keys)
{
    $delete = "DELETE FROM `$Table` WHERE ";
    if (count($keys) > 1) {
        $item = array();
        foreach ($keys as $value) {
            array_push($item, "$value");
        }
        return $delete . pageName() . " IN(" . join(",", $item) . ");";
    } else {
        return $delete . pageName() . " = '$keys[0]';";
    }
}
function INS($Table, $value)
{
    $item = array();
    foreach ($value as $el) {
        array_push($item, "'$el'");
    }
    return "INSERT INTO `$Table` VALUES (" . join(",", $item) . ");";
}
function UPD($Table, $keys, $value)
{
    $update = "UPDATE `$Table` SET ";
    $where = " WHERE $keys;";
    return $update . join(",", $value) . $where;
}
function post($name)
{
    switch ($name) {
        case 'original':
            return "= '" . $_POST[$name] . "'";
        default:
            return "`$name` = '" . $_POST[$name] . "'";
    }
}
function insPage($page)
{
    switch ($page) {
        case "aboutTeam":
            $item = array($_POST['name'], $_POST['type'], $_POST['content'], $_POST['pic']);
            return INS('about', $item);
        case "aboutPlace":
            $item = array($_POST['name'], $_POST['content'], $_POST['style']);
            return INS('about_three', $item);
        case "Message":
            $item = array(
                $_POST['type'], $_POST['date'], $_POST['big_p'], $_POST['small_p'],
                $_POST['main_p'], $_POST['text'], $_POST['readStyle'], $_POST['title'], $_POST['content']
            );
            return INS('message', $item);
    }
}
function updPage($page)
{
    switch ($page) {
        case "aboutTeam":
            $item = array(post("name"), post("type"), post("content"), post("pic"));
            return UPD('about', '`name`' . post("original"), $item);
        case "aboutPlace":
            $item = array(post("name"), post("content"), post("style"));
            return UPD('about_three', '`name`' . post("original"), $item);
        case "Message":
            $item = array(
                post("type"), post("date"), post("big_p"), post("small_p"),
                post("main_p"), post("text"), post("readStyle"), post("title"), post("content")
            );
            return UPD('message', '`title`' . post("original"), $item);
    }
}
function delPage($page, $delete)
{
    $key = explode(',', $delete);
    switch ($page) {
        case "aboutTeam":
            return DEL('about', $key);
        case "aboutPlace":
            return DEL('about_three', $key);
        case "Message":
            return DEL('message', $key);
    }
}
