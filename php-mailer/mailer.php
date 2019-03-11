<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';

$mail = new PHPMailer(true);                              // Passing `true` enables exceptions

try {
    //Server settings
    $mail->SMTPDebug = 1;                                 // Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 's65.linuxpl.com';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'hrmdrum';                 // SMTP username
    $mail->Password = 'hamerekDW!77';                           // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom('hrmdrum@gmail.com', 'Mailer');
    $mail->addAddress('hrmdrum@michaldziadkowiec.pl', 'Joe User'); // Add a recipient

    $data = json_decode(file_get_contents("php://input"), true); // convert data from AXIOS post request
    // get form fields data
    $name = $data['name'];
    $phone = $data['phone'];
    $subject = $data['subject'];
    $message = $data['message'];

    $body = '<strong>Name:</strong>' . $name . '<br>' .
            '<strong>Phone:</strong>' . $phone . '<br>' .
            '<strong>Subject:</strong>' . $subject . '<br><hr><br>' .
            '<strong>Message:</strong>' . $message;

    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Here is the TEST email';
    $mail->Body    = $body;
    $mail->AltBody = strip_tags($body);

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
}