<?php

require '../crud/veterinario.crud.php';

$_POST = json_decode(file_get_contents('php://input'), true);
print_r($_POST);
if(
    empty($_POST['diagnostico'])   ||
    empty($_POST['tratamento'])    ||
    empty($_POST['prescricao'])    ||
    empty($_POST['observacoes'])   ||
    empty($_POST['id_ficha'])      
){
    echo $_POST;
    echo "{\"result\":\"faltou algo\"}";
}
$consulta = new stdClass();
$consulta->diagnostico = $_POST['diagnostico'];
$consulta->tratamento = $_POST['tratamento'];
$consulta->prescricao = $_POST['prescricao'];
$consulta->observacoes = $_POST['observacoes'];
$consulta->id_ficha = $_POST['id_ficha'];


$result = atualizaFichaMedica($consulta);

echo "{\"result\":\"$result\"}";
        die();