<?php
declare(strict_types=1);

header('Content-Type: text/plain; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Referrer-Policy: no-referrer');
header("Content-Security-Policy: default-src 'none'; frame-ancestors 'none'");
header('Cache-Control: no-store');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    exit('Method not allowed.');
}

$contentType = strtolower((string) ($_SERVER['CONTENT_TYPE'] ?? ''));
if (strpos($contentType, 'application/json') !== 0) {
    http_response_code(415);
    exit('Unsupported media type.');
}

// Modern browsers identify cross-site requests through Fetch Metadata.
$fetchSite = strtolower((string) ($_SERVER['HTTP_SEC_FETCH_SITE'] ?? ''));
if ($fetchSite !== '' && !in_array($fetchSite, ['same-origin', 'same-site'], true)) {
    http_response_code(403);
    exit('Cross-site request blocked.');
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
$textLength = static function (string $value): int {
    return function_exists('mb_strlen') ? mb_strlen($value) : strlen($value);
};

if (
    !$privacy ||
    $name === '' || $textLength($name) > 100 ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) || $textLength($email) > 254 ||
    $message === '' || $textLength($message) > 5000 ||
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
