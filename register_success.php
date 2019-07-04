<?php
include_once 'includes/functions.php';
include_once 'includes/db_connect.php';

if(login_check($mysqli) == true){
    header("Location: ./designer.php");
    exit();
}
?>

<!DOCTYPE html>
<!--
Copyright (C) 2013 peredur.net

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title>Registration Success</title>
        <link href="css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    </head>
    <body style="background-image: url('img/background.jpg'); background-size: cover;">
        <div class="row mt-5">
	        <div class="col-md-4 mx-auto bg-white p-5 rounded">
	        	<h1>Registration successful!</h1>
	        	<p>You can now go back to the <a href="index.php">login page</a> and log in</p>
	        </div>
	    </div>
    </body>
</html>
