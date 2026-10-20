
<?php
session_start();
$timeout = 60; // 1 minutes

if (isset($_SESSION['LAST_ACTIVITY'])) {
    if (time() - $_SESSION['LAST_ACTIVITY'] > $timeout) {
        session_unset();
        session_destroy();

        header("Location: login.php?timeout=1");
        exit();
    }
}

$_SESSION['LAST_ACTIVITY'] = time();
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

if ($email === "" || $password === "") {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Please enter your email and password."
    ]);
    exit;
}

$stmt = $pdo->prepare(
    "SELECT id, name, email, password
     FROM students
     WHERE email = ?"
);
$stmt->execute([$email]);

$student = $stmt->fetch();

if (
    !$student ||
    !password_verify($password, $student["password"])
) {
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
