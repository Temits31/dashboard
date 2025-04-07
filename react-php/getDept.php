<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require "server.php";

$sql = "SELECT department, COUNT(*) as count FROM tbl_dashboard GROUP BY department";
$result = $conn->query($sql);

$data = [];

while ($row = $result->fetch_assoc()) {
  $data[] = [
    "department" => $row["department"],
    "count" => (int)$row["count"]
  ];
}

echo json_encode($data);

$conn->close();
?>