<?php
include "db_connect.php";

$key = $_GET['keyword'];

$result = $connection->query("SELECT * FROM students WHERE name LIKE '%$key%'");

echo "<h2>Search Results</h2>";

while($row = $result->fetch_assoc()){
echo $row['name']." - ".$row['email']." - ".$row['course']."<br>";
}

echo "<br><a href='dashboard.php'>Back</a>";
?>