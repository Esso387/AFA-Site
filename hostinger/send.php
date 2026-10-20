<?php
declare(strict_types=1);

/**
 * Form handler for the static Australian Freight Agency site.
 *
 * Receives the quote, contact and tracking forms, validates the input and
 * sends it to the site owner with PHP mail(). No database is used.
 *
 * ============================================================================
 * THE ONLY LINE YOU MUST EDIT BEFORE GOING LIVE IS $TO_EMAIL, BELOW.
 * Replace REPLACE_WITH_YOUR_EMAIL with the mailbox that should receive
 * enquiries. Everything else works as shipped.
 * ============================================================================
 */
$TO_EMAIL = 'REPLACE_WITH_YOUR_EMAIL';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

/** Send a JSON response and stop. */
function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'Method not allowed.']);
}

$raw = file_get_contents('php://input');
$data = [];
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
if (stripos($contentType, 'application/json') !== false) {
    $decoded = json_decode((string) $raw, true);
    if (is_array($decoded)) {
        $data = $decoded;
    }
}
if (!$data) {
    $data = $_POST;
}
if (!$data) {
    respond(400, ['ok' => false, 'error' => 'No form data received.']);
}

/** Trim, strip tags and cap the length of a submitted value. */
function field(array $data, string $key, int $max = 2000): string
{
    $value = $data[$key] ?? '';
    if (!is_scalar($value)) {
        return '';
    }
    $value = trim(strip_tags((string) $value));
    return mb_substr($value, 0, $max);
}

/** Collapse newlines so a value is safe inside a mail header. */
function oneLine(string $value): string
{
    return trim(preg_replace('/[\r\n]+/', ' ', $value) ?? '');
}

// Honeypot: real visitors never see or fill this field.
if (field($data, 'website', 200) !== '') {
    respond(400, ['ok' => false, 'error' => 'Submission rejected.']);
}

$formType = field($data, 'form_type', 20);
if (!in_array($formType, ['quote', 'contact', 'tracking'], true)) {
    respond(400, ['ok' => false, 'error' => 'Unknown form type.']);
}

$email = oneLine(field($data, 'email', 200));
if ($formType !== 'tracking') {
    if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        respond(422, ['ok' => false, 'error' => 'Please enter a valid email address.']);
    }
}

$name = oneLine(field($data, 'contact_name', 120));
$company = oneLine(field($data, 'company', 160));
$phone = oneLine(field($data, 'phone', 40));
$reference = oneLine(field($data, 'reference', 80));

if ($formType === 'quote') {
    $required = [
        'company' => $company,
        'contact_name' => $name,
        'phone' => $phone,
        'freight_type' => field($data, 'freight_type', 40),
        'origin' => field($data, 'origin', 160),
        'destination' => field($data, 'destination', 160),
    ];
    foreach ($required as $label => $value) {
        if ($value === '') {
            respond(422, ['ok' => false, 'error' => 'Please complete all required fields.']);
        }
    }
}

if ($formType === 'contact') {
    if ($name === '' || field($data, 'message', 5000) === '') {
        respond(422, ['ok' => false, 'error' => 'Please complete all required fields.']);
    }
}

if ($formType === 'tracking' && $reference === '') {
    respond(422, ['ok' => false, 'error' => 'Please enter a reference number.']);
}

$host = $_SERVER['HTTP_HOST'] ?? $_SERVER['SERVER_NAME'] ?? 'localhost';
$host = strtolower(preg_replace('/:\d+$/', '', (string) $host) ?? '');
$host = preg_replace('/^www\./', '', $host) ?? '';
$domain = preg_match('/^[a-z0-9.-]+\.[a-z]{2,}$/', $host) ? $host : 'localhost';

$labels = [
    'company' => 'Company',
    'contact_name' => 'Contact name',
    'email' => 'Email',
    'phone' => 'Phone',
    'freight_type' => 'Freight type',
    'fcl_lcl' => 'FCL or LCL',
    'origin' => 'Origin',
    'destination' => 'Destination',
    'commodity' => 'Commodity',
    'weight_volume' => 'Weight / volume',
    'ready_date' => 'Ready date',
    'message' => 'Notes',
    'reference' => 'Reference',
];

$subjects = [
    'quote' => 'Website quote request',
    'contact' => 'Website contact message',
    'tracking' => 'Website tracking enquiry',
];
$subject = $subjects[$formType];
if ($formType === 'quote' && $company !== '') {
    $subject .= ' — ' . $company;
} elseif ($formType === 'contact' && $name !== '') {
    $subject .= ' — ' . $name;
} elseif ($formType === 'tracking') {
    $subject .= ' — ' . $reference;
}

$lines = ['New submission from the Australian Freight Agency website.', ''];
foreach ($labels as $key => $label) {
    $value = field($data, $key, $key === 'message' ? 5000 : 500);
    if ($value !== '') {
        $lines[] = $label . ': ' . $value;
    }
}
$lines[] = '';
$lines[] = 'Submitted: ' . gmdate('Y-m-d H:i:s') . ' UTC';
$lines[] = 'IP: ' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
$body = implode("\n", $lines);

if ($TO_EMAIL === 'REPLACE_WITH_YOUR_EMAIL' || !filter_var($TO_EMAIL, FILTER_VALIDATE_EMAIL)) {
    respond(500, [
        'ok' => false,
        'error' => 'Form delivery is not configured yet. Please call 1300 000 000.',
    ]);
}

$headers = [
    'From: Australian Freight Agency <no-reply@' . $domain . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
];

$sent = @mail($TO_EMAIL, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    respond(500, [
        'ok' => false,
        'error' => 'We could not send your message. Please try again or call 1300 000 000.',
    ]);
}

respond(200, ['ok' => true]);
