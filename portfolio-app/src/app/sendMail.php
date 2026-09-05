<?php
declare(strict_types=1);

header('Content-Type: text/plain; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    exit('Method not allowed.');
}

$raw = file_get_contents('php://input', false, null, 0, 12001);
if ($raw === false || strlen($raw) > 12000) {
    http_response_code(413);
    exit('Request too large.');
}

$data = json_decode($raw, true);
if (!is_array($data)) {
    http_response_code(400);
    exit('Invalid request.');
}

// Hidden honeypot: legitimate visitors never fill this field.
if (!empty($data['website'])) {
    exit('OK');
}

$name = trim((string) ($data['name'] ?? ''));
$email = trim((string) ($data['email'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));
$privacy = ($data['privacy'] ?? false) === true;

if (
    !$privacy ||
    $name === '' || mb_strlen($name) > 100 ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 254 ||
    $message === '' || mb_strlen($message) > 5000 ||
    preg_match('/[\r\n]/', $email)
) {
    http_response_code(422);
    exit('Please check your input.');
}

$safeName = htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safeEmail = htmlspecialchars($email, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safeMessage = nl2br(htmlspecialchars($message, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'));
$subject = '=?UTF-8?B?' . base64_encode('Neue Kontaktanfrage von ' . $name) . '?=';
$headers = implode("\r\n", [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: Website-Kontakt <no-reply@leorullani.com>',
    'Reply-To: ' . $email
]);
$body = '<html><body><h3>Neue Kontaktanfrage</h3>'
    . '<p><strong>Name:</strong> ' . $safeName . '</p>'
    . '<p><strong>E-Mail:</strong> ' . $safeEmail . '</p>'
    . '<p><strong>Nachricht:</strong><br>' . $safeMessage . '</p>'
    . '<p>Datenschutz bestätigt: Ja</p></body></html>';

if (!mail('coding@leorullani.com', $subject, $body, $headers)) {
    http_response_code(500);
    exit('Mail could not be sent.');
}

echo 'OK';
