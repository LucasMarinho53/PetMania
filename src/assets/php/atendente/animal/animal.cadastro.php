<?php

header('Access-Control-Allow-Origin: *');
header("content-type: application/json");
//header("Content-type: application/x-www-form-urlencoded");
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: *");

require('../../crud/atendente.crud.php');

$_POST = json_decode(file_get_contents('php://input'), true);

if($_POST['data_nasc']   == NULL ||
   $_POST['nome_animal'] == NULL ||
   $_POST['raca_animal'] == NULL ||
   $_POST['sexo_animal'] == NULL || 
   $_POST['id_dono']     == NULL
   )
{
    echo "{\"result\":\"Dados Inválidos\"}";
	die();
}



$animal = new stdClass();

$animal->id_dono = $_POST['id_dono'];
$animal->data_nasc = $_POST['data_nasc'];
$animal->nome_animal = $_POST['nome_animal'];
$animal->raca_animal = $_POST['id_raca'];
$animal->sexo_animal = $_POST['sexo_animal'];



$result = CadastroAnimal($animal);

echo "{\"result\":\"$result\"}";
