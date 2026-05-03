<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.html');
    exit;
}

$to      = 'contact@johanna-jamin.fr';
$prenom  = htmlspecialchars(strip_tags(trim($_POST['prenom'] ?? '')));
$nom     = htmlspecialchars(strip_tags(trim($_POST['nom'] ?? '')));
$email   = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$soin    = htmlspecialchars(strip_tags(trim($_POST['soin'] ?? '')));
$message = htmlspecialchars(strip_tags(trim($_POST['message'] ?? '')));

if (empty($prenom) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: index.html#contact');
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

if ($sent) {
    header('Location: index.html?sent=1#contact');
} else {
    header('Location: index.html?error=1#contact');
}
exit;
