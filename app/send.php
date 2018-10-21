<?php
    header('Content-Type: application/x-www-form-urlencoded; charset: utf-8');
    $obj = join("\r\n", $_POST["data"]);
    $header = 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/plain; charset=UTF-8' . "\r\n";
    mail("your@mail.com", "Subject", $obj , $header);
?>