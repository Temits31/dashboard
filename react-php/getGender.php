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
    echo json_encode(["male" => 0, "female" => 0, "others" => 0]); 
    exit();
  }
}

$date_imported_id = $_SESSION["importedId"];

$stmtM = $conn->prepare("SELECT COUNT(*) as count FROM tbl_dashboard WHERE date_imported_id = ? AND sex = 'M'");
$stmtM->bind_param("i", $date_imported_id);
$stmtM->execute();
$resultM = $stmtM->get_result()->fetch_assoc();
$maleCount = (int)$resultM['count'];

$stmtF = $conn->prepare("SELECT COUNT(*) as count FROM tbl_dashboard WHERE date_imported_id = ? AND sex = 'F'");
$stmtF->bind_param("i", $date_imported_id);
$stmtF->execute();
$resultF = $stmtF->get_result()->fetch_assoc();
$femaleCount = (int)$resultF['count'];

$stmtO = $conn->prepare("SELECT COUNT(*) as count FROM tbl_dashboard WHERE date_imported_id = ? AND sex NOT IN ('M', 'F')");
$stmtO->bind_param("i", $date_imported_id);
$stmtO->execute();
$resultO = $stmtO->get_result()->fetch_assoc();
$othersCount = (int)$resultO['count'];

echo json_encode([
  "male" => $maleCount,
  "female" => $femaleCount,
  "others" => $othersCount
]);

$conn->close();
?>
