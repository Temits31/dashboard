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
  

$sql = "SELECT item_number, pos_title, salary_grade, stepSal,
        isposFirstlvl, isposSeclvl, isposExeclvl, empType,
        authorizedAnnualSal, actualAnnualSal, monthlySal, areaCode,
        areaType, level, attribution, incumbetFullName, isFilled,
        isUnfilled, division, department, lastName, firstName,
        middleName, sex, dateofBirth, age, tinNumber,
        origAppointDate, lastPromotionDate, appointStatus, CSElig
        FROM tbl_dashboard WHERE date_imported_id = ?"; 

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $date_imported_id);
$stmt->execute();
$result = $stmt->get_result();

$rowdata = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $rowdata[] = $row;
    }
}

echo json_encode($rowdata);

$conn->close();
?>