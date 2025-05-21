<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173/");
header("Content-Type: application/json");

require "server.php";

if (!isset($_SESSION["importedId"])) {
  echo json_encode(["error" => "No importedId in session"]);
  exit();
}

$date_imported_id = $_SESSION["importedId"];

$sql = "SELECT age, COUNT(*) as count FROM tbl_dashboard WHERE date_imported_id = ? GROUP BY age";

$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $date_imported_id);
$stmt->execute();
$result = $stmt->get_result();

$data = [];

while ($row = $result->fetch_assoc()) {
  $data[] = [
    "age" => $row["age"],
    "count" => (int)$row["count"]
  ];
}

echo json_encode($data);

$stmt->close();
$conn->close();
?>
