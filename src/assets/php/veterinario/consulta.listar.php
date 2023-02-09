<?php

require('../crud/veterinario.crud.php');

if(isset($_GET['buscar']) && !empty($_GET['buscar']) && $_GET['buscar'] != NULL)
{
    echo json_encode(listarFichas($_GET['buscar']),JSON_UNESCAPED_UNICODE);
}else
{
    echo json_encode(listarFichas(''),JSON_UNESCAPED_UNICODE);
}
