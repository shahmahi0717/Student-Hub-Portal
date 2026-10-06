
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

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Invalid request data."
    ]);
    exit;
}

$name = trim($data["name"] ?? "");
$email = strtolower(trim($data["email"] ?? ""));
$mobile = trim($data["mobile"] ?? "");
$course = trim($data["course"] ?? "");
$semester = filter_var(
    $data["semester"] ?? null,
    FILTER_VALIDATE_INT
);
$enrollment = trim($data["enrollment"] ?? "");
$password = $data["password"] ?? "";

if (
    $name === "" ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) ||
    $password === "" ||
    $semester === false ||
    $semester === null
) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Please enter valid registration details."
    ]);
    exit;
}

if (strlen($password) < 8) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Password must contain at least 8 characters."
    ]);
    exit;
}

try {
    $check = $pdo->prepare(
        "SELECT id FROM students
         WHERE email = ? OR
         (enrollment = ? AND ? <> '')"
    );
    $check->execute([$email, $enrollment, $enrollment]);

    if ($check->fetch()) {
        echo json_encode([
            "success" => false,
            "message" => "Email or enrollment number is already registered."
        ]);
        exit;
    }

    $hashedPassword = password_hash(
        $password,
        PASSWORD_DEFAULT
    );

    $stmt = $pdo->prepare(
        "INSERT INTO students
        (student_code, name, email, password, mobile,
         course, semester, enrollment)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    );

    $stmt->execute([
        $enrollment !== "" ? $enrollment : null,
        $name,
        $email,
        $hashedPassword,
        $mobile,
        $course,
        $semester,
        $enrollment !== "" ? $enrollment : null
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Registration successful!"
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Registration could not be completed."
    ]);
}
?>