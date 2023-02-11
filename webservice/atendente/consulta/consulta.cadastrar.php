<?php

header('Access-Control-Allow-Origin: *');
header("content-type: application/json");
//header("Content-type: application/x-www-form-urlencoded");
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: *");

require('../../crud/atendente.crud.php');

$_POST = json_decode(file_get_contents('php://input'), true);

if(
    empty($_POST['id_animal']) ||
    empty($_POST['id_vet']) ||
    empty($_POST['motivo'])
){
    //echo "{\"result\":\"Dados Inválidos\"}";
    echo "{\"result\":".json_encode($_POST)."}";
    die();
    
}

else{
    $consulta = new stdClass();
    $consulta->idAnimal = $_POST['id_animal'];
    $consulta->idVet = $_POST['id_vet'];
    $consulta->motivo = $_POST['motivo'];

    $result = CadastroFichaMedica($consulta);
        echo "{\"result\":\"$result\"}";
        die();

}