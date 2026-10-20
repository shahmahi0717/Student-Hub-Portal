
<?php
session_start();
$timeout = 60; // 1 minutes

if (isset($_SESSION['LAST_ACTIVITY'])) {
    if (time() - $_SESSION['LAST_ACTIVITY'] > $timeout) {
        session_unset();
        session_destroy();

        header("Location: register.php?timeout=1");
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
<?php
if (isset($_GET['timeout'])) {
    echo "<p style='color:red;'>
        Registration session expired. Please try again.
    </p>";
}
?>

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
$enrollment = trim($data["enrollment"] ?? "");
$email = strtolower(trim($data["email"] ?? ""));
$mobile = trim($data["mobile"] ?? "");
$course = trim($data["course"] ?? "");
$semester = filter_var(
    $data["semester"] ?? null,
    FILTER_VALIDATE_INT
);
$password = $data["password"] ?? "";

if (
    $name === "" ||
    $enrollment === "" ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) ||
    $mobile === "" ||
    $course === "" ||
    $semester === false ||
    $semester === null ||
    $semester < 1 ||
    $semester > 12 ||
    !preg_match('/^[0-9]{10}$/', $mobile)
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
         WHERE email = ? OR enrollment = ? OR student_code = ?"
    );
    $check->execute([$email, $enrollment, $enrollment]);

    if ($check->fetch()) {
        http_response_code(409);
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
        $enrollment,
        $name,
        $email,
        $hashedPassword,
        $mobile,
        $course,
        $semester,
        $enrollment
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Registration successful! You can now log in."
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Registration failed. Please check your database."
    ]);
}
?>
