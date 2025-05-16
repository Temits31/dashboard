<?php
ob_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

require "server.php";
require_once __DIR__ . '/vendor/phpoffice/phpword/src/PhpWord/Autoloader.php';
\PhpOffice\PhpWord\Autoloader::register();

use PhpOffice\PhpWord\PhpWord;
use PhpOffice\PhpWord\IOFactory;
use PhpOffice\PhpWord\SimpleType\Jc;

ob_clean();
flush();



$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['image']) && isset($data['description'])) {
    $imageData = $data['image'];
    $descriptions = $data['description'];

    $imageData = preg_replace('/^data:image\/\w+;base64,/', '', $imageData);
    $imageData = str_replace(' ', '+', $imageData);
    $imageBinary = base64_decode($imageData);

    if (!$imageBinary) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Invalid image data"]);
        exit;
    }

    $imageFilename = 'chart_' . uniqid() . '.png';
    $imagePath = __DIR__ . '/' . $imageFilename;
    file_put_contents($imagePath, $imageBinary);

    $phpWord = new PhpWord();
    $section = $phpWord->addSection();

    $reportDate = date("F j, Y");
    $section->addText("HRMO Chart Report", ['bold' => true, 'size' => 16], ['alignment' => Jc::CENTER]);
    $section->addText("Generated on: $reportDate", ['size' => 12], ['alignment' => Jc::CENTER]);
    $section->addTextBreak(1);

    list($imgWidth, $imgHeight) = getimagesize($imagePath);
    $maxWidth = 350; 
    $scale = $maxWidth / $imgWidth;
    $scaledHeight = $imgHeight * $scale;

    $section->addImage($imagePath, [
        'width' => $maxWidth,
        'height' => $scaledHeight,
        'alignment' => Jc::CENTER
    ]);
    $section->addTextBreak(1);

    $section->addText("Chart Details:", ['bold' => true, 'size' => 12]);
    foreach ($descriptions as $desc) {
        $section->addText("- " . $desc, ['size' => 11]);
    }

    $fileName = 'HRMO_Report_' . date("Ymd_His") . '.docx';
    $filePath = __DIR__ . '/' . $fileName;

    $writer = IOFactory::createWriter($phpWord, 'Word2007');
    $writer->save($filePath);

    header('Content-Description: File Transfer');
    header('Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    header('Content-Disposition: attachment; filename="' . $fileName . '"');
    header('Content-Length: ' . filesize($filePath));
    readfile($filePath);

    unlink($imagePath);
    unlink($filePath);
    ob_end_flush();
    ob_end_clean();

    exit;

} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Missing image or description."]);
}
