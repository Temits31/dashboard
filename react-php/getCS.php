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

$sql = "SELECT CSElig, COUNT(*) as count FROM tbl_dashboard WHERE date_imported_id = ? GROUP BY CSElig";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $date_imported_id);
$stmt->execute();
$result = $stmt->get_result();

$data = [];

while ($row = $result->fetch_assoc()) {
  $data[] = [
    "CSElig" => $row["CSElig"],
    "count" => (int)$row["count"]
  ];
}

echo json_encode($data);

$conn->close();
?>