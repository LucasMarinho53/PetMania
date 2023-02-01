<?php

require('../../crud/atendente.crud.php');

session_start();

if(isset($_GET['id_especie']) && !empty($_GET['id_especie']) && $_GET['id_especie'] != NULL)
{
    echo json_encode(listaRacas($_GET['id_especie']));
}
else{
    echo "{\"result\":error}";
}