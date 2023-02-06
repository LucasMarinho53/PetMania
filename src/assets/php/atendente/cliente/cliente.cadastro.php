<?php

require('../../crud/atendente.crud.php');

$postData = file_get_contents('php://input');
if (!empty($postData)) {
    $_POST = json_decode($postData, true);
}


if (
    $_POST['nome'] == NULL ||
    $_POST['cpf'] == NULL ||
    $_POST['email'] == NULL ||
    $_POST['telefone'] == NULL ||
    $_POST['cidade'] == NULL ||
    $_POST['bairro'] == NULL ||
    $_POST['logradouro'] == NULL ||
    $_POST['numero'] == NULL ||
    $_POST['cep'] == NULL
) {
    echo "{\"result\":\"incomplete data\"}";
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
