<?php
function SEL($Table)
{
    return "SELECT * FROM `$Table`;";
}
function DEL($Table, $keys)
{
    return "DELETE FROM `$Table` WHERE $keys;";
}
function INS(
    $Table,
    $value
) {
    $insert = "INSERT INTO `$Table` VALUES ('$value[0]'";
    if ($value[8]) {
        return $insert . ", '$value[1]', '$value[2]', '$value[3]', '$value[4]', '$value[5]', '$value[6]', '$value[7]', '$value[8]');";
    } else if ($value[7]) {
        return $insert . ", '$value[1]', '$value[2]', '$value[3]', '$value[4]', '$value[5]', '$value[6]', '$value[7]');";
    } else if ($value[6]) {
        return $insert . ", '$value[1]', '$value[2]', '$value[3]', '$value[4]', '$value[5]', '$value[6]');";
    } else if ($value[5]) {
        return $insert . ", '$value[1]', '$value[2]', '$value[3]', '$value[4]', '$value[5]');";
    } else if ($value[4]) {
        return $insert . ", '$value[1]', '$value[2]', '$value[3]', '$value[4]');";
    } else if ($value[3]) {
        return $insert . ", '$value[1]', '$value[2]', '$value[3]');";
    } else if ($value[2]) {
        return $insert . ", '$value[1]', '$value[2]');";
    } else if ($value[1]) {
        return $insert . ", '$value[1]');";
    } else {
        return $insert . ");";
    }
}
function UPD(
    $Table,
    $keys,
    $value
) {
    $update = "UPDATE `$Table` SET '$value[0]'";
    $where = " WHERE $keys;";
    if ($value[8]) {
        return $update . ", '$value[1]', '$value[2]', '$value[3]', '$value[4]', '$value[5]', '$value[6]', '$value[7]', '$value[8]'" . $where;
    } else if ($value[7]) {
        return $update . ", '$value[1]', '$value[2]', '$value[3]', '$value[4]', '$value[5]', '$value[6]', '$value[7]'" . $where;
    } else if ($value[6]) {
        return $update . ", '$value[1]', '$value[2]', '$value[3]', '$value[4]', '$value[5]', '$value[6]'" . $where;
    } else if ($value[5]) {
        return $update . ", '$value[1]', '$value[2]', '$value[3]', '$value[4]', '$value[5]'" . $where;
    } else if ($value[4]) {
        return $update . ", '$value[1]', '$value[2]', '$value[3]', '$value[4]'" . $where;
    } else if ($value[3]) {
        return $update . ", '$value[1]', '$value[2]', '$value[3]'" . $where;
    } else if ($value[2]) {
        return $update . ", '$value[1]', '$value[2]'" . $where;
    } else if ($value[1]) {
        return $update . ", '$value[1]'" . $where;
    } else {
        return $update . $where;
    }
}
function insPage($page)
{
    $item = array('', array());
    switch ($page) {
        case "aboutTeam":
            $item[0] = 'about';
            $item[1] = array($_POST['name'], $_POST['type'], $_POST['pic'], $_POST['content']);
            return $item;
        case "aboutPlace":
            $item[0] = 'about_three';
            $item[1] = array($_POST['name'], $_POST['style'], $_POST['content']);
            return $item;
    }
}
