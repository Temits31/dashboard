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

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['importedId']) || empty($input['importedId'])) {
    echo json_encode([
        "success" => false,
        "message" => "Missing importedId.",
    ]);
    exit();
}

$_SESSION['importedId'] = $input['importedId'];

echo json_encode([
    "success" => true,
    "storedId" => $input['importedId'],
]);
