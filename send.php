<?php
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'method']);
    exit;
}

/* ── Honeypot ───────────────────────────────────────────────── */
// Le champ "website" est invisible pour les humains.
// Un bot le remplit → on rejette silencieusement.
if (!empty($_POST['website'])) {
    echo json_encode(['success' => true]); // fausse confirmation
    exit;
}

/* ── Rate limiting (3 envois max par heure par IP) ──────────── */
$ip       = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$ip_key   = preg_replace('/[^a-zA-Z0-9_\-]/', '_', $ip);
$rl_file  = sys_get_temp_dir() . '/jj_rl_' . $ip_key . '.json';
$limit    = 3;
$window   = 3600; // 1 heure en secondes
$now      = time();

$data = file_exists($rl_file) ? json_decode(file_get_contents($rl_file), true) : ['count' => 0, 'reset_at' => $now + $window];

if ($now > $data['reset_at']) {
    $data = ['count' => 0, 'reset_at' => $now + $window];
}

if ($data['count'] >= $limit) {
    echo json_encode(['success' => false, 'error' => 'rate_limit']);
    exit;
}

$data['count']++;
file_put_contents($rl_file, json_encode($data), LOCK_EX);

/* ── Validation champs ──────────────────────────────────────── */
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

/* ── Envoi mail ─────────────────────────────────────────────── */
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
