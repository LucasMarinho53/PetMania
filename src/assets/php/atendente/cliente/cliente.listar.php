<?php

require('../../crud/atendente.crud.php');



if(isset($_GET['buscar']) && !empty($_GET['buscar']) && $_GET['buscar'] != NULL)
{
    echo json_encode(listaClientes($_GET['buscar']));
    //print_r(listaClientes($_GET['buscar']));
}else
{
    //echo json_encode(listaClientes(''));
    echo json_encode(listaClientes(''),JSON_UNESCAPED_UNICODE);
    
}

//header('location: ./atendente.listar.cliente.php');

/*

JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE
*/