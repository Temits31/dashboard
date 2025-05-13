<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require "server.php";

$sql = "SELECT division, COUNT(*) as count FROM tbl_dashboard WHERE date_imported_id = (
  SELECT MAX(date_imported_id) FROM tbl_dashboard
) GROUP BY division";
$result = $conn->query($sql);

$data = [];

while ($row = $result->fetch_assoc()) {
  $data[] = [
    "division" => $row["division"],
    "count" => (int)$row["count"]
  ];
}

echo json_encode($data);

$conn->close();
