<?php

require('../../crud/atendente.crud.php');

$_POST = json_decode(file_get_contents('php://input'), true);

if(
    !empty($_POST['nome']) ||
    !empty($_POST['cpf']) ||
    !empty($_POST['email']) ||
    !empty($_POST['telefone']) ||
    !empty($_POST['localidade']) ||
    !empty($_POST['bairro']) ||
    !empty($_POST['logradouro']) ||
    !empty($_POST['cep']) ||
    !empty($_POST['numero']) ||
    !empty($_POST['id_dono']) ||
    !empty($_POST['id_end'])
    
)
{
    $cliente = new stdClass();
    $cliente->Nome = $_POST['nome'];
    $cliente->cpf = $_POST['cpf'];
    $cliente->email = $_POST['email'];
    $cliente->telefone = $_POST['telefone'];
    $cliente->cidade = $_POST['localidade'];
    $cliente->bairro = $_POST['bairro'];
    $cliente->logradouro = $_POST['logradouro'];
    $cliente->CEP = $_POST['cep'];
    $cliente->numero = $_POST['numero'];
    $cliente->id_dono = $_POST['id_dono'];
    $cliente->endereco = $_POST['id_end'];


    
    $result = AtualizaCliente($cliente);
    echo "{\"result\":\"$result\"}";
    
}