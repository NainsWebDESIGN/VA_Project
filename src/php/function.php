<?php
function SEL($Table)
{
    return "SELECT * FROM `$Table`;";
}
function pageName($page)
{
    switch ($page) {
        case 'aboutTeam':
        case 'aboutPlace':
            return '`name`';
    }
}
function DEL($Table, $keys, $page)
{
    $delete = "DELETE FROM `$Table` WHERE ";
    if (count($keys) > 1) {
        $item = array();
        foreach ($keys as $value) {
            array_push($item, "'$value'");
        }
        $final = join(",", $item);
        return $delete . pageName($page) . " IN(" . $final . ");";
    } else {
        return $delete . pageName($page) . " = '$keys[0]';";
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
    $item = array();
    foreach ($value as $el) {
        array_push($item, "'$el'");
    }
    $update = "UPDATE `$Table` SET ";
    $where = " WHERE $keys;";
    return $update . join(",", $item) . $where;
}
function insPage($page)
{
    $item = array('', array());
    switch ($page) {
        case "aboutTeam":
            $item[0] = 'about';
            $item[1] = array($_POST['name'], $_POST['type'], $_POST['content'], $_POST['pic']);
            return $item;
        case "aboutPlace":
            $item[0] = 'about_three';
            $item[1] = array($_POST['name'], $_POST['style'], $_POST['content']);
            return $item;
    }
}
function updPage($page)
{
    $item = array('', '', array());
    switch ($page) {
        case "aboutTeam":
            $item[0] = 'about';
            $item[1] = $_POST['original'];
            $item[2] = array($_POST['name'], $_POST['type'], $_POST['content'], $_POST['pic']);
            return $item;
        case "aboutPlace":
            $item[0] = 'about_three';
            $item[1] = $_POST['original'];
            $item[2] = array($_POST['name'], $_POST['style'], $_POST['content']);
            return $item;
    }
}
function delPage($page, $delete)
{
    $basic = array('', array());
    $key = explode(',', $delete);
    switch ($page) {
        case "aboutTeam":
            $basic[0] = 'about';
            break;
        case "aboutPlace":
            $basic[0] = 'about_three';
            break;
    }
    foreach ($key as $el) {
        array_push($basic[1], $el);
    }
    return $basic;
}
