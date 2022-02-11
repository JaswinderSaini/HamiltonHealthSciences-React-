<?php
/**
 * Author name - Jaswinder Singh, 000838586
 * Date - 25-11-2021
 * This file delete the given item from the shopping list table
*/
 
try {
    $dbh = new PDO(
        "mysql:host=localhost;dbname=sa000838586",
        "root",
        ""
    );
} catch (Exception $e) {
    die("ERROR: Couldn't connect. {$e->getMessage()}");
}
