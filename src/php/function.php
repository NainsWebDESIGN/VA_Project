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
        case 'Contact':
            return '`media`';
        default:
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
function post($name, $data = null)
{
    switch ($name) {
        case 'original':
            return "= '" . $_POST[$name] . "'";
        case 'serviceContent':
            $box = array(
                "`text_1` = '" . $data[0] . "'",
                "`text_2` = '" . $data[1] . "'",
                "`text_3` = '" . $data[2] . "'",
                "`text_4` = '" . $data[3] . "'",
                "`type` = '" . $data[4] . "'"
            );
            return $box;
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
        case "Contact":
            $item = array($_POST['media'], $_POST['href'], $_POST['style']);
            return INS('contact', $item);
        case "ServiceDo":
            $item = array($_POST['title'], $_POST['style'], $_POST['content']);
            return INS('service', $item);
        case "ServiceLeft":
            $item = array($_POST['title'], $_POST['percentage']);
            return INS('service_left', $item);
        case "ServiceRight":
            $item = array($_POST['title'], $_POST['percentage']);
            return INS('service_right', $item);
        case "ServicePortofio":
            $item = array($_POST['title'], $_POST['type'], $_POST['image'], $_POST['content']);
            return INS('project', $item);
        case "ServiceMonth":
            $item = array("month", $_POST['title'], $_POST['price']);
            return INS('service_month', $item);
        case "ServiceYear":
            $item = array("year", $_POST['title'], $_POST['price']);
            return INS('service_year', $item);
        case "monthContent":
            $item = explode(',', $_POST['content']);
            array_push($item, $_POST['title']);
            return INS('month_content', $item);
        case "yearContent":
            $item = explode(',', $_POST['content']);
            array_push($item, $_POST['title']);
            return INS('year_content', $item);
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
        case "Contact":
            $item = array(post("media"), post("href"), post("style"));
            return UPD('contact', '`media`' . post("original"), $item);
        case "ServiceDo":
            $item = array(post("title"), post("style"), post("content"));
            return UPD('service', '`title`' . post("original"), $item);
        case "ServiceLeft":
            $item = array(post("title"), post("percentage"));
            return UPD('service_left', '`title`' . post("original"), $item);
        case "ServiceRight":
            $item = array(post("title"), post("percentage"));
            return UPD('service_right', '`title`' . post("original"), $item);
        case "ServicePortofio":
            $item = array(post("title"), post("type"), post("image"), post("content"));
            return UPD('project', '`title`' . post("original"), $item);
        case "ServiceMonth":
            $item = array(post("month"), post("title"), post("price"));
            return UPD('service_month', '`title`' . post("original"), $item);
        case "ServiceYear":
            $item = array(post("year"), post("title"), post("price"));
            return UPD('service_year', '`title`' . post("original"), $item);
        case "monthContent":
            $key = explode(',', $_POST['content']);
            array_push($key, $_POST['title']);
            $item = post('serviceContent', $key);
            return UPD('month_content', '`title`' . post("original"), $item);
        case "yearContent":
            $key = explode(',', $_POST['content']);
            array_push($key, $_POST['title']);
            $item = post('serviceContent', $key);
            return UPD('year_content', '`title`' . post("original"), $item);
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
        case "Contact":
            return DEL('contact', $key);
        case "ServiceDo":
            return DEL('service', $key);
        case "ServiceLeft":
            return DEL('service_left', $key);
        case "ServiceRight":
            return DEL('service_right', $key);
        case "ServicePortofio":
            return DEL('project', $key);
        case "ServiceMonth":
            return DEL('service_month', $key);
        case "ServiceYear":
            return DEL('service_year', $key);
        case "monthContent":
            return DEL('month_content', $key);
        case "yearContent":
            return DEL('year_content', $key);
    }
}
