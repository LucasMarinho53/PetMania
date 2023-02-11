<?php
$cookie_name = 'ROOTPATH';
$cookie_value = __DIR__ . DIRECTORY_SEPARATOR . 'api';
setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/"); // 86400 = 1 day


$url = $_GET['url'];
include($url);