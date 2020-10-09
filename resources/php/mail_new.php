<?php

echo "<pre>";print_r($POST);echo"</pre>";
echo "<script> console.log('PHP: ');</script>";

if (isset($_POST["name"])) {
  echo "<script> console.log('PHP: ');</script>";
    $name = '';
    $email = '';
    $message = '';

    $name_error = '';
    $email_error = '';
    $message_error = '';
    $captcha_error = '';

    if (empty($_POST["name"])) {
        $name_error = 'First name is required';
    } else {
        $name = $_POST["name"];
    }

    if (empty($_POST["email"])) {
        $email_error = 'Email is required';
    } else {
        if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
            $email_error = 'Invalid Email';
        } else {
            $email = $_POST["email"];
        }
    }

    if (empty($_POST["message"])) {
        $message_error = 'message is required';
    } else {
        $message = $_POST["message"];
    }

    if (empty($_POST['g-recaptcha-response'])) {
        $captcha_error = 'Captcha is required';
    } else {
        $secret_key = '6Lcjsc8ZAAAAADNhGuBn4gTh4CIj1FBoLs9lswje';
            print_r("3");

        if ($name_error == '' && $email_error == '' && $message_error == '' && $captcha_error == '') {
                print_r("2");

            $response = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$secret_key.
                '&response='.$_POST['g-recaptcha-response']);

            $response_data = json_decode($response);

            if (!$response_data->success) {
                $captcha_error = 'Captcha verification failed';
            }
        }
    }

    if ($name_error == '' && $email_error == '' && $message_error == '' && $captcha_error == '') {
        $data = array(
            'success' => true
        );
        
    } else {
        $data = array(
            'name_error' => $name_error,
            'email_error' => $email_error,
            'message_error' => $message_error,
            'captcha_error' => $captcha_error
        );
        

    }

    echo json_encode($data);
}
?>
