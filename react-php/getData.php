<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require "server.php";

$sql = "SELECT item_number, pos_title, salary_grade, stepSal,
        isposFirstlvl, isposSeclvl, isposExeclvl, empType,
        authorizedAnnualSal, actualAnnualSal, monthlySal, areaCode,
        areaType, level, attribution, incumbetFullName, isFilled,
        isUnfilled, division, department, lastName, firstName,
        middleName, sex, dateofBirth, age, tinNumber,
        origAppointDate, lastPromotionDate, appointStatus, CSElig
        FROM tbl_dashboard"; 

$result = $conn->query($sql);

$rowdata = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $rowdata[] = $row;
    }
}

echo json_encode($rowdata);

$conn->close();
?>