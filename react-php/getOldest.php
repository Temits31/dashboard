<?php
session_start(); 
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

require "server.php";

if (!isset($_SESSION["importedId"])) {
  $fallbackSql = "SELECT date_imported_id FROM date_imported ORDER BY date_imported_id DESC LIMIT 1";
  $fallbackResult = $conn->query($fallbackSql);
  
  if ($fallbackResult && $fallbackResult->num_rows > 0) {
    $row = $fallbackResult->fetch_assoc();
    $_SESSION["importedId"] = $row["date_imported_id"];
  } else {
    echo json_encode([]); 
    exit();
  }
}

$date_imported_id = $_SESSION["importedId"];

$sql = "SELECT t1.AGE as oldestAge, t1.incumbetFullName, t1.department
FROM tbl_dashboard t1
INNER JOIN (
    SELECT department, MAX(AGE) AS max_age
    FROM tbl_dashboard
    WHERE date_imported_id = ?
    GROUP BY department
) t2 ON t1.department = t2.department AND t1.AGE = t2.max_age
WHERE t1.date_imported_id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $date_imported_id, $date_imported_id);
$stmt->execute();
$result = $stmt->get_result();

$data = [];

while ($row = $result->fetch_assoc()) {
  $data[] = [
    "oldestAge" => (int)$row["oldestAge"],
    "incumbetFullName" => $row["incumbetFullName"],
    "department" => $row["department"]
  ];
}

echo json_encode($data);

$conn->close();
?>