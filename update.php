<?php
include "db.php";

$id = $_GET['id'];
$data = $conn->query("SELECT * FROM students WHERE id=$id")->fetch_assoc();

if(isset($_POST['update'])){
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $contact = $_POST['contact'];

    $conn->query("UPDATE students SET 
    fname='$fname',
    lname='$lname',
    contact='$contact'
    WHERE id=$id");

    header("Location:index.php");
}
?>

<!DOCTYPE html>
<html>
<head>
<title>Update Student</title>

<style>
body { font-family:'Segoe UI'; background:#eef2f7; }

.container { display:flex; justify-content:center; margin-top:80px; }

.card {
background:white;
padding:25px;
border-radius:12px;
box-shadow:0 10px 25px rgba(0,0,0,0.1);
width:320px;
}

input {
width:100%;
padding:10px;
margin:8px 0;
border-radius:8px;
border:1px solid #ccc;
}

button {
width:100%;
padding:10px;
border:none;
border-radius:8px;
background:#3498db;
color:white;
}
</style>

</head>

<body>

<div class="container">
<div class="card">

<h2>Update Student</h2>

<form method="POST">
<input type="text" value="<?php echo $data['roll']; ?>" disabled>
<input type="text" name="fname" value="<?php echo $data['fname']; ?>">
<input type="text" name="lname" value="<?php echo $data['lname']; ?>">
<input type="text" name="contact" value="<?php echo $data['contact']; ?>">

<button name="update">Update</button>
</form>

</div>
</div>

</body>
</html> 