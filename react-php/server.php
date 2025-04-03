<?php
$host = "localhost"; 
$user = "root";       
$password = "";       
$database = "dashboard"; 

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
    echo 'Connection Established';
}

$conn->set_charset("utf8");

?>