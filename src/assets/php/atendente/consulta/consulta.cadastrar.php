<?php

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