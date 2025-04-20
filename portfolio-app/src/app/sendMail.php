<?php
// Da wir nur "OK" oder eine Fehlermeldung zurückgeben,
// kann das Response-Header ruhig "text/plain" bleiben.
// Wichtig ist, dass dein Angular-Request als "application/json" gesendet wird!
header("Content-Type: text/plain; charset=UTF-8");

// JSON aus Angular auslesen
$json = file_get_contents("php://input");
$data = json_decode($json, true);

// Fallback bei fehlerhaftem JSON
if (!$data) {
    echo "Keine gültigen JSON-Daten empfangen.";
    exit;
}

// Formulardaten auslesen
$name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$message = $data['message'] ?? '';
$privacy = $data['privacy'] ?? false;

// Empfänger deiner E-Mail
$to = "coding@leorullani.com";

// UTF-8-kodierter Betreff
$subjectRaw = "Neue Kontaktanfrage von $name";
$subject = "=?UTF-8?B?" . base64_encode($subjectRaw) . "?=";

// Mail-Header
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: \"Website-Kontakt\" <no-reply@leorullani.com>\r\n";

// Falls eine Mailadresse vom Nutzer kam, Reply-To hinzufügen
if (!empty($email)) {
    $headers .= "Reply-To: <$email>\r\n";
}

// HTML nach Belieben formatieren
$formattedMessage = nl2br(htmlspecialchars($message));

// Mail-Inhalt
$emailBody = "
<html>
  <head>
    <meta charset='UTF-8'>
  </head>
  <body>
    <h3>Neue Kontaktanfrage</h3>
    <p><strong>Name:</strong> $name</p>
    <p><strong>E-Mail:</strong> $email</p>
    <p><strong>Nachricht:</strong><br>$formattedMessage</p>
    <p>Datenschutz bestätigt: " . ($privacy ? "Ja" : "Nein") . "</p>
  </body>
</html>
";

// Mail versenden
$success = mail($to, $subject, $emailBody, $headers);

if ($success) {
    echo "OK";
} else {
    echo "Mail konnte nicht gesendet werden.";
}
