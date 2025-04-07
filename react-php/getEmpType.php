<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require "server.php";

$sql = "SELECT empType, COUNT(*) as count FROM tbl_dashboard GROUP BY empType";
$result = $conn->query($sql);

$data = [];

while ($row = $result->fetch_assoc()) {
  $data[] = [
    "empType" => $row["empType"],
    "count" => (int)$row["count"]
  ];
}

echo json_encode($data);

$conn->close();
?>