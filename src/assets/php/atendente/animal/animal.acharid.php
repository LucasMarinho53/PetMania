<?php

require('../../crud/atendente.crud.php');

$result;

if(isset($_GET['buscar']) && !empty($_GET['buscar']) && $_GET['buscar'] != NULL)
{
    $result = json_encode(listaAnimaisID($_GET['buscar']));






}else{
    $result = "{\"result\":\"Id nao preenchido\"}";
}

if(!$result){
    $result = "{\"result\":\"Id nao encontrado\"}";
}
    
    echo $result;
