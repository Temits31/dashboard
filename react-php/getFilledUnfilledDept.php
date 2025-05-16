<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require "server.php";

$sql = "
SELECT 
  department,
  SUM(CASE WHEN isFilled = 1 THEN 1 ELSE 0 END) AS filled,
  SUM(CASE WHEN isUnfilled = 1 THEN 1 ELSE 0 END) AS unfilled
FROM tbl_dashboard
WHERE date_imported_id = (
  SELECT MAX(date_imported_id) FROM tbl_dashboard
)
GROUP BY department
ORDER BY department
";

$result = $conn->query($sql);

$data = [];

if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $data[] = [
      "department" => $row["department"],
      "filled" => (int)$row["filled"],
      "unfilled" => (int)$row["unfilled"]
    ];
  }
}

echo json_encode($data);
$conn->close();
?>
