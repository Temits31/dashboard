<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require "server.php";

$sql = "SELECT CSElig, COUNT(*) as count FROM tbl_dashboard GROUP BY CSElig";
$result = $conn->query($sql);

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