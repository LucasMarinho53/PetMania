<?php

header('Access-Control-Allow-Origin: *');
header("content-type: application/json");
//header("Content-type: application/x-www-form-urlencoded");
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: *");

require('../../crud/atendente.crud.php');

$_POST = json_decode(file_get_contents('php://input'), true);

if(
    empty($_POST['idAnimal']) ||
    empty($_POST['idVet']) ||
    empty($_POST['motivo'])
){
    echo "erro: faltou algo!";
    
    
}

else{
    $consulta = new stdClass();
    $consulta->idAnimal = $_POST['idAnimal'];
    $consulta->idVet = $_POST['idVet'];
    $consulta->motivo = $_POST['motivo'];

    $result = CadastroFichaMedica($consulta);
        echo "{\"result\":\"$result\"}";
        die();

}