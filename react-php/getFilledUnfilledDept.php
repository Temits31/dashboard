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
ini_set('display_errors', 1);
error_reporting(E_ALL);


$date_imported_id = $_SESSION["importedId"];

$sql = "
SELECT 
  department,
  SUM(CASE WHEN isFilled = 1 THEN 1 ELSE 0 END) AS filled,
  SUM(CASE WHEN isUnfilled = 1 THEN 1 ELSE 0 END) AS unfilled
FROM tbl_dashboard
WHERE date_imported_id = ?
GROUP BY department
ORDER BY department
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $date_imported_id);
$stmt->execute();
$result = $stmt->get_result();

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
