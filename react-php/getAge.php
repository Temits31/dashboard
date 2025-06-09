<?php
session_start(); 
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");


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
    CASE
      WHEN age BETWEEN 20 AND 29 THEN '20-29'
      WHEN age BETWEEN 30 AND 39 THEN '30-39'
      WHEN age BETWEEN 40 AND 49 THEN '40-49'
      WHEN age BETWEEN 50 AND 59 THEN '50-59'
      WHEN age >= 60 THEN '60+'
      ELSE 'Unknown'
    END AS ageGroup,
    COUNT(*) as count
  FROM tbl_dashboard
  WHERE date_imported_id = ?
  GROUP BY ageGroup
  ORDER BY ageGroup
";

$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $date_imported_id);
$stmt->execute();
$result = $stmt->get_result();

$ageGroups = [
  '20-29' => 0,
  '30-39' => 0,
  '40-49' => 0,
  '50-59' => 0,
  '60+' => 0,
];

while ($row = $result->fetch_assoc()) {
  $group = $row['ageGroup'];
  if (isset($ageGroups[$group])) {
    $ageGroups[$group] = (int)$row['count'];
  }
}

$data = [];
foreach ($ageGroups as $group => $count) {
  $data[] = [
    'ageGroup' => $group,
    'count' => $count,
  ];
}

echo json_encode($data);

?>
