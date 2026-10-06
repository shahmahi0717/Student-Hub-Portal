<?php
session_start();
header("Content-Type: application/json");

require_once "db.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "POST request required."
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$email = strtolower(trim($data["email"] ?? ""));
$password = $data["password"] ?? "";

$stmt = $pdo->prepare(
    "SELECT id, name, email, password
     FROM students
     WHERE email = ?"
);
$stmt->execute([$email]);

$student = $stmt->fetch();
if (!$student || !password_verify($password, $student["password"])) {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "message" => "Invalid email or password."
    ]);
    exit;
}

session_regenerate_id(true);
$_SESSION["student_id"] = $student["id"];
$_SESSION["student_name"] = $student["name"];

echo json_encode([
    "success" => true,
    "message" => "Login successful!"
]);
?>