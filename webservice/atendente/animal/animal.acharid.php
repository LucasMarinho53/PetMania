<?php

header('Access-Control-Allow-Origin: *');
header("content-type: application/json");
//header("Content-type: application/x-www-form-urlencoded");
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: *");

require('../../crud/atendente.crud.php');

$result;

if(isset($_GET['buscar']) && !empty($_GET['buscar']) && $_GET['buscar'] != NULL)
{
    $result = json_encode(listaAnimaisID($_GET['buscar']));






}else{
    $result = "{\"result\":\"Id nao preenchido\"}";
}

if(!$result){
    $result = "{\"result\":\"Id nao encontrado\"}";
}
    
    echo $result;
