<?php
include "db.php";

$fname=$_POST['fname'];
$lname=$_POST['lname'];
$roll=$_POST['roll'];
$pass=$_POST['pass'];
$contact=$_POST['contact'];

$conn->query("INSERT INTO students(fname,lname,roll,password,contact)
VALUES('$fname','$lname','$roll','$pass','$contact')");

header("Location:index.php");
?>