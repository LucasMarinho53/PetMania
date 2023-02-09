<?php



require('../../crud/atendente.crud.php');

if(isset($_GET['buscar']) && !empty($_GET['buscar']) && $_GET['buscar'] != NULL)
{
    echo json_encode(listarServicos($_GET['buscar']),JSON_UNESCAPED_UNICODE);
}else
{
    echo json_encode(listarServicos(''),JSON_UNESCAPED_UNICODE);
}

