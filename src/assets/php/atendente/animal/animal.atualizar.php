<?php

header('Access-Control-Allow-Origin: *');
header("content-type: application/json");
//header("Content-type: application/x-www-form-urlencoded");
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: *");

require('../../crud/atendente.crud.php');

$_POST = json_decode(file_get_contents('php://input'), true);

if(
$_POST['nome_animal'] == NULL ||
$_POST['sexo_animal'] == NULL ||
$_POST['data_nasc'] == NULL ||
$_POST['id_raca'] == NULL ||
$_POST['id_animal'] == NULL
)
{
    echo "{\"result\":\"Dados Inválidos\"}";
	die();
}

$atualizaanimal = new stdClass();

$atualizaanimal->nome_animal = $_POST['nome_animal'];
$atualizaanimal->sexo_animal = $_POST['sexo_animal'];
$atualizaanimal->data_nasc = $_POST['data_nasc'];
$atualizaanimal->raca_animal = $_POST['id_raca'];
$atualizaanimal->id_animal = $_POST['id_animal'];



$result = AtualizaAnimal($atualizaanimal);

echo "{\"result\":\"$result\"}";