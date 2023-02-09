<?php

require '../crud/veterinario.crud.php';

if(isset($_GET['buscar']) && !empty($_GET['buscar']) && $_GET['buscar'] != NULL)
{
    echo json_encode(listaFichaID($_GET['buscar']),JSON_UNESCAPED_UNICODE);
}