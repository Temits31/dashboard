<?php

session_start();


header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$logFile = __DIR__ . '/session_log.txt';

file_put_contents($logFile, "---- " . date("Y-m-d H:i:s") . " ----\n", FILE_APPEND);
file_put_contents($logFile, print_r($_SESSION, true) . "\n\n", FILE_APPEND);

$input = json_decode(file_get_contents("php://input"), true);



if (!isset($input['importedId']) || empty($input['importedId'])) {
    echo json_encode([
        "success" => false,
        "message" => "Missing importedId.",
    ]);
    exit();
}

$importedId = $input['importedId'];
$_SESSION['importedId'] = $importedId;

echo json_encode([
    "success" => true,
    "storedId" => $importedId
]);
