
<?php
require 'db.php';

$username = 'admin';
$password = password_hash('Admin@123', PASSWORD_DEFAULT);
$role = 'admin';

$stmt = $conn->prepare(
    "INSERT INTO users (username, password, role)
     VALUES (?, ?, ?)"
);

$stmt->bind_param("sss", $username, $password, $role);

if ($stmt->execute()) {
    echo "Admin account created successfully!";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
