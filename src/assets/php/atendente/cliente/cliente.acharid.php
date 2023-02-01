<?php

require('../../crud/atendente.crud.php');

$result;

if(isset($_GET['buscar']) && !empty($_GET['buscar']) && $_GET['buscar'] != NULL)
{
    $result = json_encode(listaClienteID($_GET['buscar']));
}

echo $result;