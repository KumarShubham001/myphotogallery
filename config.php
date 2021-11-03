<?php // USERNAME
$dbusername = "root";

// PASSWORD
$dbpassword = "admin";

// HOST
$dbhost = "localhost";

// DB name
$dbname = "";

// CONNECT
$con=mysqli_connect($dbhost,$dbusername,$dbpassword,$dbname);
if (mysqli_connect_errno())
{
    echo "Failed to connect to MySQL:" . mysqli_connect_error();
}?>