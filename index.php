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
include_once 'includes/db_connect.php';
include_once 'includes/functions.php';

sec_session_start();

if(login_check($mysqli) == true){
    header("Location: ./designer.php");

}
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Brochure Designer</title>
        <link href="css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <script type="text/JavaScript" src="js/sha512.js"></script> 
        <script type="text/JavaScript" src="js/forms.js"></script> 
    </head>
    <body style="background-image: url('img/background.jpg'); background-size: cover;">
        <div class="containter">
            <div class="row">
                <div class="col-md-3 mx-auto mb-5">
                    <?php
                    if (isset($_GET['error'])) {
                        echo '<div class="alert alert-danger mt-5 alert-dismissible fade show">Error Logging In!</div>';
                    }   
                    ?>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3 mx-auto bg-white p-5 rounded">
                    <div class="row">
                        <div class="col-md-12">
                            <form action="includes/process_login.php" method="post" name="login_form" id="login-form" class="mt-2"> 			
                                <label for="email">Email address</label>
                                <input type="text" name="email" id="email" class="form-control mb-3" />
                                <label for="password">Password</label>
                                <input type="password" name="password" id="password" class="form-control mb-3"/>
                                <input type="button" value="Login" onclick="formhash(this.form, this.form.password);" class="btn btn-primary float-right" /> 
                            </form>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <p>If you don't have an account, please <a href="register.php">register</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
