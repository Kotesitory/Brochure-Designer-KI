<?php
/**
 * Copyright (C) 2013 peredur.net
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
include_once 'includes/register.inc.php';
include_once 'includes/functions.php';
session_start();

if(login_check($mysqli) == true){
    header("Location: ./designer.php");
    exit();
}
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Register</title>
        <script type="text/JavaScript" src="js/sha512.js"></script> 
        <script type="text/JavaScript" src="js/forms.js"></script>
        <link href="css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    </head>
    <body style="background-image: url('img/background.jpg'); background-size: cover;">
        <div class="container">
            <div class="row">
                <div class="col-md-5 mx-auto mt-3 bg-white p-5 rounded">
                    <!-- Registration form to be output if the POST variables are not
                    set or if the registration script caused an error. -->
                    <h1 class="my-5">Register with us</h1>
                    <?php
                    if (!empty($error_msg)) {
                        echo $error_msg;
                    }
                    ?>
                    <form method="post" name="registration_form" action="<?php echo esc_url($_SERVER['PHP_SELF']); ?>">
                        <label for="username">Username</label>
                        <input type='text' name='username' id='username' class="form-control mb-2" />
                        <small class="text-muted mb-2">Usernames may contain only digits, upper and lower case letters and underscores</small><br>
                        <label for="email">Email Address</label>
                        <input type="text" name="email" id="email" class="form-control mb-2" />
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" class="form-control mb-2"/>
                        <small class="text-muted mb-2">Password mus tbe at least 6 characters long and contain at least one of each: (A-Z), (a-z) and (0-9)</small><br>
                        <label for="confirmpwd">Confirm Password</label>
                        <input type="password" name="confirmpwd" id="confirmpwd" class="form-control mb-2"/>
                        <input type="button" value="Register" class="btn btn-primary my-2" onclick="return regformhash( this.form,
                                                                                                                   this.form.username,
                                                                                                                   this.form.email,
                                                                                                                   this.form.password,
                                                                                                                   this.form.confirmpwd);" /> 
                    </form>
                    <p>Return to the <a href="index.php">login page</a>.</p>
                </div>
            </div>
        </div>
    </body>
    
</html>
