<?php
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'method']);
    exit;
}

$to      = 'contact@johanna-jamin.fr';
$prenom  = htmlspecialchars(strip_tags(trim($_POST['prenom'] ?? '')));
$nom     = htmlspecialchars(strip_tags(trim($_POST['nom'] ?? '')));
$email   = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$soin    = htmlspecialchars(strip_tags(trim($_POST['soin'] ?? '')));
$message = htmlspecialchars(strip_tags(trim($_POST['message'] ?? '')));

if (empty($prenom) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'error' => 'invalid']);
    exit;
}

$subject = "Nouvelle demande de soin – $prenom $nom";

$body  = "Prénom : $prenom\n";
$body .= "Nom : $nom\n";
$body .= "Email : $email\n";
$body .= "Soin souhaité : $soin\n";
$body .= "\nMessage :\n$message\n";

$headers  = "From: no-reply@johanna-jamin.fr\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = mail($to, $subject, $body, $headers);

echo json_encode(['success' => $sent]);
