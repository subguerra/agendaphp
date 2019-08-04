<?php
//son los datos de tu base de datos
// credenciales de la base de datos
define('DB_USUARIO', 'usuario');
define('DB_PASSWORD', 'tu pw');
define('DB_HOST', 'tu host');
define('DB_NOMBRE', 'tu nombre');
//port 

$conn = new mysqli(DB_HOST, DB_USUARIO, DB_PASSWORD, DB_NOMBRE );