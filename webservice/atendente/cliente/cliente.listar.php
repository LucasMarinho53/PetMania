<?php

header('Access-Control-Allow-Origin: *');
header("content-type: application/json");
//header("Content-type: application/x-www-form-urlencoded");
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: *");

require('../../crud/atendente.crud.php');



if(isset($_GET['buscar']) && !empty($_GET['buscar']) && $_GET['buscar'] != NULL)
{
    echo json_encode(listaClientes($_GET['buscar']),JSON_UNESCAPED_UNICODE);
}else
{
    echo json_encode(listaClientes(''),JSON_UNESCAPED_UNICODE);
}

//header('location: ./atendente.listar.cliente.php');