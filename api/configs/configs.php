<?php
    error_reporting(E_ALL);
spl_autoload_register(function($file_name){

    $fileName = "..".DIRECTORY_SEPARATOR ."..".DIRECTORY_SEPARATOR . "models" . DIRECTORY_SEPARATOR . "{$file_name}.php";


    if(file_exists($fileName)) {        
        require_once($fileName);
    }
});
