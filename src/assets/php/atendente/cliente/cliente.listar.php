<?php

require('../../crud/atendente.crud.php');



if(isset($_GET['buscar']) && !empty($_GET['buscar']) && $_GET['buscar'] != NULL)
{
    echo json_encode(listaClientes($_GET['buscar']),JSON_UNESCAPED_UNICODE);
}else
{
    echo json_encode(listaClientes(''),JSON_UNESCAPED_UNICODE);
}

//header('location: ./atendente.listar.cliente.php');