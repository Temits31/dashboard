<?php
session_start(); 
header("Access-Control-Allow-Origin: *");
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
$sql = "
  SELECT 
    YEAR(origAppointDate) AS appointment_year, 
    COUNT(*) AS employee_count
  FROM tbl_dashboard  WHERE date_imported_id = ?
  GROUP BY origAppointDate
  ORDER BY origAppointDate ASC
";

$result = $conn->query($sql);

$data = [];

if ($result) {
  while ($row = $result->fetch_assoc()) {
    $data[] = [
      'appointment_year' => (int)$row['appointment_year'],
      'employee_count' => (int)$row['employee_count']
    ];
  }
}

echo json_encode($data);
?>
