<?php include "db.php"; ?>

<!DOCTYPE html>
<html>
<head>
<title>Student Manager</title>

<style>
    /* Chinmay Narule */
body {
    font-family: 'Segoe UI', sans-serif;
    background: #eef2f7;
    margin: 0;
}

.container {
    display: flex;
    justify-content: center;
    gap: 40px;
    padding: 40px;
}

.card {
    background: white;
    padding: 25px;
    border-radius: 14px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.form-card { width: 320px; }
.table-card { width: 720px; }

input {
    width: 100%;
    padding: 10px;
    margin: 8px 0;
    border-radius: 8px;
    border: 1px solid #ccc;
}

button {
    padding: 10px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

.add-btn {
    width: 100%;
    background: #4CAF50;
    color: white;
}

.search-box {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
}

.search-btn {
    background: #333;
    color: white;
}

/* Table */
table {
    width: 100%;
    border-collapse: collapse;
}

th {
    background: #2c3e50;
    color: white;
    padding: 12px;
}

td {
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #eee;
}

/* Buttons */
.action-btn {
    padding: 6px 12px;
    border-radius: 6px;
    text-decoration: none;
    color: white;
}

.edit-btn { background: #3498db; }
.delete-btn { background: #e74c3c; }
</style>

<script>
// FORM VALIDATION
function validateForm(){
let pass=document.forms["f"]["pass"].value;
let cpass=document.forms["f"]["cpass"].value;

if(pass.length < 6){
alert("Password must be at least 6 characters");
return false;
}

if(pass != cpass){
alert("Passwords do not match");
return false;
}

return true;
}

// DELETE CONFIRMATION
function confirmDelete(id){
    if(confirm("Are you sure you want to delete this student?")){
        window.location.href = "delete.php?id=" + id;
    }
}
</script>

</head>

<body>

<?php
// SUCCESS MESSAGE
if(isset($_GET['msg']) && $_GET['msg']=="deleted"){
    echo "<script>alert('Student deleted successfully');</script>";
}
?>

<div class="container">

<!-- FORM -->
<div class="card form-card">
<h2>Register Student</h2>

<form name="f" action="insert.php" method="POST" onsubmit="return validateForm()">
<input type="text" name="fname" placeholder="First Name" required>
<input type="text" name="lname" placeholder="Last Name" required>
<input type="text" name="roll" placeholder="Roll Number" required>
<input type="password" name="pass" placeholder="Password" required>
<input type="password" name="cpass" placeholder="Confirm Password" required>
<input type="text" name="contact" placeholder="Contact Number" required>

<button class="add-btn">Add Student</button>
</form>
</div>

<!-- TABLE -->
<div class="card table-card">
<h2>Student Records</h2>

<form method="GET" class="search-box">
<input type="text" name="search" placeholder="Search by Roll"
value="<?php if(isset($_GET['search'])) echo $_GET['search']; ?>">
<button class="search-btn">Search</button>
</form>

<table>
<tr>
<th>Roll</th>
<th>Name</th>
<th>Contact</th>
<th>Actions</th>
</tr>

<?php
if(isset($_GET['search']) && $_GET['search'] != ""){
    $key=$_GET['search'];
    $res=$conn->query("SELECT * FROM students WHERE roll='$key'");
}else{
    $res=$conn->query("SELECT * FROM students");
}

if($res->num_rows > 0){
while($row=$res->fetch_assoc()){
echo "<tr>
<td>{$row['roll']}</td>
<td>{$row['fname']} {$row['lname']}</td>
<td>{$row['contact']}</td>
<td>
<a class='action-btn edit-btn' href='update.php?id={$row['id']}'>Edit</a>
<a class='action-btn delete-btn' onclick='confirmDelete({$row['id']})'>Delete</a>
</td>
</tr>";
}
} else {
echo "<tr><td colspan='4'>No records</td></tr>";
}
?>

</table>

</div>

</div>

</body>
</html>