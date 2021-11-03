<?php 

//here we upload the image :D

$data = $_POST['image'];
$filename = $_POST['filename'];
$loc = $_POST['location'];

list($type, $data) = explode(';', $data);
list(, $data)      = explode(',', $data);

$data = base64_decode($data);

if($loc == "img") {
    file_put_contents('../images/uploads/'.$loc.'/'.$filename.'.jpeg', $data);
} else {
    file_put_contents('../images/uploads/'.$loc.'/'.$filename.'.png', $data);
}

?>