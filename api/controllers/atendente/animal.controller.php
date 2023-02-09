<?php

require_once '../../configs/configs.php';
require_once '../../services/atendente/animal.service.php';
/*
$current_path = $_SERVER['SCRIPT_NAME'];
$request_uri = $_SERVER['REQUEST_URI'];
$relative_uri = str_replace($current_path, '', $request_uri);

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );
print_r($uri);*/



if($_SERVER['REQUEST_METHOD'] == "GET"){
    if(isset($_GET['buscar']) && !empty($_GET['buscar'])){
        echo json_encode(getListaAnimal($_GET["buscar"]));
    }else{
        echo json_encode(getListaAnimal(''));
    }
    
}
