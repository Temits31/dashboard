<?php
session_start(); 
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

require "server.php";

$sql = "SELECT DISTINCT(date_imported_id), date_imported FROM date_imported ORDER BY date_imported_id DESC"; 

$result = $conn->query($sql);

$rowdate = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $rowdate[] = $row;
    }
}

echo json_encode($rowdate);

$conn->close();
?>