<?php
$to = "hello@kumarshubham.in";
$subject = "Photogallary | Message from " . $_POST['name'];
$message = 
"Message details: <br>
Name: " . $_POST['name'] . "
EMail: " . $_POST['from_email'] . "
Mesaage:<br><p>" . $_POST['message'] . "</p>";
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'From: <kr.shubham997@gmail.com>' . "\r\n";

mail($to,$subject,$message,$headers);


$to = $_POST['from_email'];
$subject = "My Photo Gallary | Thanks for connecting with us";

$message = "
<center><h1>Thanks for connecting with us!</h1>
<h3>Our dedicated team is on the way to reach out to you as soon as possible.<br>I hope you liked my little photo gallary. Again thanks for reaching out to us.</h3>
<p>Please donot replay back to this mail. This is an auto-generated email.</p>
";

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'From: <kr.shubham997@gmail.com>' . "\r\n";

mail($to,$subject,$message,$headers);

echo 1;

?>