<?php

header('Access-Control-Allow-Origin: *');
header("content-type: application/json");
//header("Content-type: application/x-www-form-urlencoded");
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: *");

require('../../crud/atendente.crud.php');

if(
    empty($_GET['idficha']) ||
    empty($_GET['idservico']) 
){
    echo "erro: faltou algo!";   
    die();
}

$remove = new stdClass();
$remove->idFicha = $_GET['idficha'];
$remove->idServico = $_GET['idservico'];

$result = removeServicos($remove);
        echo "{\"result\":\"$result\"}";
        die();