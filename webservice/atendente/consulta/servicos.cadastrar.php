<?php

header('Access-Control-Allow-Origin: *');
header("content-type: application/json");
//header("Content-type: application/x-www-form-urlencoded");
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: *");

$_POST = json_decode(file_get_contents('php://input'), true);

require('../../crud/atendente.crud.php');


if(
    empty($_POST['id_ficha']) ||
    empty($_POST['id_servico']) 
){
    echo "erro: faltou algo!";   
    die();
}
$remove = new stdClass();
$remove->idFicha = $_POST['id_ficha'];
$remove->idServico = $_POST['id_servico'];


$result = servicosPrestados($remove);
        echo "{\"result\":\"$result\"}";
        die();

