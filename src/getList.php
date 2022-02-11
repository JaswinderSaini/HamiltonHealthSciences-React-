<?php
/**
 * Author name - Jaswinder Singh, 000838586
 * Date - 25-11-2021
 * This file gets each item from the shopping list table
 */

// including this file to connect to the database
include "connect.php";

$itemArray = [];  // for shopping items
// getting all the rows from shopping list table
$command = "SELECT * FROM shopping_list ORDER BY item";
$stmt = $dbh->prepare($command);
$stmt->execute();

// fill the itemArray until all rows all finished
while($row = $stmt->fetch()){
    $item = ["item_id" => $row["item_id"], "item" => $row["item"], "quantity" => $row["quantity"]];
    array_push($itemArray, $item);
}

//sending the list to Javascript file
echo json_encode($itemArray);
?>
