
<?php
/**
 * Author name - Jaswinder Singh, 000838586
 * Date - 25-11-2021
 * This file inserts a new row in shopping list table
 */

// including this file to connect to the database
include "connect.php";
// filtering the values for insert command
$item = filter_input(INPUT_GET, "item", FILTER_SANITIZE_SPECIAL_CHARS);
$quantity = filter_input(INPUT_GET, "quantity", FILTER_VALIDATE_INT);

$success = 0;  // it stays zero, if inserts goes successfully

// checking if the given values are correct
if($item === null || $item === false || $quantity === null || $quantity === false){
    $success = -1;
}
else{
    // inserting a new row in shopping list table
    $command = "INSERT INTO shopping_list (item,quantity) VALUES(?,?)";
    $stmt = $dbh->prepare($command);
    $stmt->execute([$item, $quantity]);
}

//sending the result if the row is inserted or not to Javascript file
echo json_encode($success);
