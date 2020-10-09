<?php

    // Get the form fields, removes html tags and whitespace.
    $name = strip_tags(trim($_POST["name"]));
    $name = str_replace(array("\r","\n"),array(" "," "),$name);
    $interest = trim($_POST['interest']);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    $response = $_POST["g-recaptcha-response"];

    $url = 'https://www.google.com/recaptcha/api/siteverify';
	$data = array(
		'secret' => '6Lcjsc8ZAAAAADNhGuBn4gTh4CIj1FBoLs9lswje',
		'response' => $_POST["g-recaptcha-response"]
	);
	$options = array(
		'http' => array (
			'method' => 'POST',
			'content' => http_build_query($data)
		)
	);
	$context  = stream_context_create($options);
	$verify = file_get_contents($url, false, $context);
	$captcha_success=json_decode($verify);
   
    if ($captcha_success->success==false) {
		echo "<p>You are a bot! Go away!</p>";
	} else if ($captcha_success->success==true) {
		echo "<p>You are not not a bot!</p>";
	}

    // Check the data.
    if (empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: https://www.frostig.de/contact-error.html");
        exit;
    }

    // Set the recipient email address.
    $recipient = "christian.frost.work@gmail.com";

    // Set the email subject.
    $subject = "Website Inquiry:  $name,  $interest,  $email";

    // Build the email content.
    $email_content = "Name: $name\n";
    $email_content .= "Interest: $interest\n";
    $email_content .= "Email: $email\n\n\n";
    $email_content .= "Message:\n$message\n";
    $email_content .= "\n\n\n\nSender-ID: dja2gbld6kifbg8apkld9fbog0hf\n";

    // Build the email headers.
    $email_headers = "MIME-Version: 1.0\r\n";
    $email_headers .= "Content-type: text/plain; charset=utf-8\r\n";
    $email_headers .= "From: $name <$email>";

    // Send the email.
    mail($recipient, $subject, $email_content, $email_headers);
    
    // Redirect to the index.html page with success code
    header("Location: https://www.frostig.de/contact-success.html");

?>