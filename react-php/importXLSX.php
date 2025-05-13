<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

require "server.php";

try {
    $data = json_decode(file_get_contents('php://input'), true);


    if ($data && is_array($data)) {

        $today = new DateTime();
        $date = $today->format('Y-m-d');
        $time = $today->format('H:i:s');

        $stmt = $conn->prepare("INSERT INTO dashboard.date_imported (date_imported, time_imported) VALUES (?, ?)");
        $stmt->bind_param('ss', $date, $time);
        $stmt->execute();

        $date_id = $conn->insert_id;
        $sql = "INSERT INTO tbl_dashboard (
            item_number, pos_title, salary_grade, stepSal, isposFirstlvl, isposSeclvl, isposExeclvl,
            empType, authorizedAnnualSal, actualAnnualSal, monthlySal, areaCode, areaType, level, attribution,
            incumbetFullName, isFilled, isUnfilled, division, department, lastName, firstName, middleName, sex,
            dateofBirth, age, tinNumber, origAppointDate, lastPromotionDate, appointStatus, CSElig, date_imported_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        

        $dbstmt = $conn->prepare($sql);


        foreach ($data as $row) {
            if (!is_array($row)) continue;



            $item_number = $row[0] ?? null;
            $pos_title = $row[1] ?? null;
            $salary_grade = is_numeric($row[2]) ? intval($row[2]) : null;
            $stepSal = is_numeric($row[10]) ? intval($row[10]) : null;
            $isposFirstlvl = isset($row[3]) ? intval($row[3]) : 0;
            $isposSeclvl = isset($row[4]) ? intval($row[4]) : 0;
            $isposExeclvl = isset($row[5]) ? intval($row[5]) : 0;
            $empType = $row[6] ?? null;
            $authorizedAnnualSal = is_numeric($row[7]) ? floatval($row[7]) : 0;
            $actualAnnualSal = is_numeric($row[8]) ? floatval($row[8]) : 0;
            $monthlySal = is_numeric($row[9]) ? floatval($row[9]) : 0;
            $areaCode = $row[11] ?? null;
            $areaType = $row[12] ?? null;
            $level = $row[13] ?? null;
            $attribution = $row[14] ?? null;
            $incumbetFullName = $row[15] ?? null;
            $isFilled = isset($row[16]) ? intval($row[16]) : 0;
            $isUnfilled = isset($row[17]) ? intval($row[17]) : 0;
            $division = $row[18] ?? null;
            $department = $row[19] ?? null;
            $lastName = $row[20] ?? null;
            $firstName = $row[21] ?? null;
            $middleName = $row[22] ?? null;
            $sex = $row[23] ?? null;
            $day =  null;
            $month =  null;
            $year = null;

            if (
                is_numeric($day) && $day >= 1 && $day <= 31 &&
                is_numeric($month) && $month >= 1 && $month <= 12 &&
                is_numeric($year) && $year > 1900 && $year < 2100
            ) {
                $dateofBirth = sprintf('%04d-%02d-%02d', $year, $month, $day);
                try {
                    $birthDate = new DateTime($dateofBirth);
                    $age = $birthDate->diff(new DateTime('today'))->y;
                } catch (Exception $e) {
                    $dateofBirth = null;
                    $age = null;
                }
            } else {
                $dateofBirth = null;
                $age = null;
            }
            $tinNumber = $row[29] ?? null;
            $origAppointDate = !empty($row[30]) ? date('Y-m-d', strtotime($row[30])) : null;
            $lastPromotionDate = !empty($row[31]) ? date('Y-m-d', strtotime($row[31])) : null;
            $appointStatus = $row[26] ?? null;
            $CSElig = $row[27] ?? null;

            $dbstmt->bind_param(
                'ssiiiiisdddsssssiisssssssisssssi',
                $item_number,
                $pos_title,
                $salary_grade,
                $stepSal,
                $isposFirstlvl,
                $isposSeclvl,
                $isposExeclvl,
                $empType,
                $authorizedAnnualSal,
                $actualAnnualSal,
                $monthlySal,
                $areaCode,
                $areaType,
                $level,
                $attribution,
                $incumbetFullName,
                $isFilled,
                $isUnfilled,
                $division,
                $department,
                $lastName,
                $firstName,
                $middleName,
                $sex,
                $dateofBirth,
                $age,
                $tinNumber,
                $origAppointDate,
                $lastPromotionDate,
                $appointStatus,
                $CSElig,
                $date_id
            );
            $dbstmt->execute();
            
        }


        


        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid data received']);
    }
} catch (\Throwable $th) {
    echo json_encode(['status' => 'error', 'message' => $th->getMessage()]);
}
