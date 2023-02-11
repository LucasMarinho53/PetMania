<?php

header('Access-Control-Allow-Origin: *');
header("content-type: application/json");
//header("Content-type: application/x-www-form-urlencoded");
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: *");

require('../../crud/atendente.crud.php');



if(isset($_GET['id_especie']) && !empty($_GET['id_especie']) && $_GET['id_especie'] != NULL)
{
    echo json_encode(listaRacas($_GET['id_especie']),JSON_UNESCAPED_UNICODE);
}
else{
    echo "{\"result\":error}";
}