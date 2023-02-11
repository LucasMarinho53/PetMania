<?php

header('Access-Control-Allow-Origin: *');
header("content-type: application/json");
//header("Content-type: application/x-www-form-urlencoded");
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: *");

require('../../crud/atendente.crud.php');
ini_set('display_errors', 0);
$_POST = json_decode(file_get_contents('php://input'), true);
//echo json_encode($_POST,JSON_UNESCAPED_UNICODE);

if($_POST['nome'] == NULL ||
   $_POST['cpf'] == NULL ||
   $_POST['email'] == NULL ||
   $_POST['telefone'] == NULL ||
   $_POST['cidade'] == NULL ||
   $_POST['bairro'] == NULL ||
   $_POST['logradouro'] == NULL ||
   $_POST['cep'] == NULL ||
   $_POST['numero'] == NULL)
{
    echo "{\"result\":\"incomplete data\"}";
    //echo "{\"result\":".json_encode($__POST)."}";
    die();
}

$cliente = new stdClass();
$cliente->cpf = $_POST['cpf'];
$cliente->nome = $_POST['nome'];
$cliente->email = $_POST['email'];
$cliente->telefone = $_POST['telefone'];
$cliente->cidade = $_POST['cidade'];
$cliente->bairro = $_POST['bairro'];
$cliente->logradouro = $_POST['logradouro'];
$cliente->numero = $_POST['numero'];
$cliente->cep = $_POST['cep'];




$resultado = cadastroCliente($cliente);
    echo "{\"result\":\"$resultado\"}";