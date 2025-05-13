<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require "server.php";

$sql = "SELECT 
          SUM(CASE WHEN isFilled = 1 THEN 1 ELSE 0 END) AS filled,
          SUM(CASE WHEN isUnfilled = 1 THEN 1 ELSE 0 END) AS unfilled
        FROM tbl_dashboard WHERE date_imported_id = (
  SELECT MAX(date_imported_id) FROM tbl_dashboard
) ORDER BY date_imported_id ";

$result = $conn->query($sql);

$data = [];

if ($row = $result->fetch_assoc()) {
  $data[] = [
    "status" => "Filled",
    "count" => (int)$row["filled"]
  ];
  $data[] = [
    "status" => "Unfilled",
    "count" => (int)$row["unfilled"]
  ];
}

echo json_encode($data);
$conn->close();
?>
