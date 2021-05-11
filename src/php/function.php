<?php
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
    }
}
function DEL($Table, $keys)
{
    $delete = "DELETE FROM `$Table` WHERE ";
    if (count($keys) > 1) {
        $item = array();
        foreach ($keys as $value) {
            array_push($item, "'$value'");
        }
        $final = join(",", $item);
        return $delete . pageName() . " IN(" . $final . ");";
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
    $item = array();
    foreach ($value as $el) {
        array_push($item, "$el");
    }
    $update = "UPDATE `$Table` SET ";
    $where = " WHERE $keys;";
    return $update . join(",", $item) . $where;
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
    }
}
function updPage($page)
{
    switch ($page) {
        case "aboutTeam":
            $item = array("`name` = '" . $_POST['name'] . "'", "`type` = '" . $_POST['type'] . "'", "`content` = '" . $_POST['content'] . "'", "`pic` = '" . $_POST['pic'] . "'");
            return UPD('about', '`name` = ' . $_POST['original'], $item);
        case "aboutPlace":
            $item = array("`name` = '" . $_POST['name'] . "'", "`content` = '" . $_POST['content'] . "'", "`style` = '" . $_POST['style'] . "'");
            return UPD('about_three', '`name` = ' . $_POST['original'], $item);
    }
}
function delPage($page, $delete)
{
    $basic = array();
    $key = explode(',', $delete);
    foreach ($key as $el) {
        array_push($basic, $el);
    }
    switch ($page) {
        case "aboutTeam":
            return DEL('about', $basic);
        case "aboutPlace":
            return DEL('about_three', $basic);
    }
}
