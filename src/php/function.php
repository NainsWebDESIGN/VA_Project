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
    $value1,
    $value2 = null,
    $value3 = null,
    $value4 = null,
    $value5 = null,
    $value6 = null,
    $value7 = null,
    $value8 = null,
    $value9 = null
) {
    $insert = "INSERT INTO `$Table` VALUES ('$value1'";
    if ($value9) {
        return $insert . ", '$value2', '$value3', '$value4', '$value5', '$value6', '$value7', '$value8', '$value9');";
    } else if ($value8) {
        return $insert . ", '$value2', '$value3', '$value4', '$value5', '$value6', '$value7', '$value8');";
    } else if ($value7) {
        return $insert . ", '$value2', '$value3', '$value4', '$value5', '$value6', '$value7');";
    } else if ($value6) {
        return $insert . ", '$value2', '$value3', '$value4', '$value5', '$value6');";
    } else if ($value5) {
        return $insert . ", '$value2', '$value3', '$value4', '$value5');";
    } else if ($value4) {
        return $insert . ", '$value2', '$value3', '$value4');";
    } else if ($value3) {
        return $insert . ", '$value2', '$value3');";
    } else if ($value2) {
        return $insert . ", '$value2');";
    } else {
        return $insert . ");";
    }
}
function UPD(
    $Table,
    $keys,
    $value1,
    $value2 = null,
    $value3 = null,
    $value4 = null,
    $value5 = null,
    $value6 = null,
    $value7 = null,
    $value8 = null,
    $value9 = null
) {
    $update = "UPDATE `$Table` SET $value1";
    $where = " WHERE $keys;";
    if ($value9) {
        return $update . ", '$value2', '$value3', '$value4', '$value5', '$value6', '$value7', '$value8', '$value9'" . $where;
    } else if ($value8) {
        return $update . ", '$value2', '$value3', '$value4', '$value5', '$value6', '$value7', '$value8'" . $where;
    } else if ($value7) {
        return $update . ", '$value2', '$value3', '$value4', '$value5', '$value6', '$value7'" . $where;
    } else if ($value6) {
        return $update . ", '$value2', '$value3', '$value4', '$value5', '$value6'" . $where;
    } else if ($value5) {
        return $update . ", '$value2', '$value3', '$value4', '$value5'" . $where;
    } else if ($value4) {
        return $update . ", '$value2', '$value3', '$value4'" . $where;
    } else if ($value3) {
        return $update . ", '$value2', '$value3'" . $where;
    } else if ($value2) {
        return $update . ", '$value2'" . $where;
    } else {
        return $update . $where;
    }
}
