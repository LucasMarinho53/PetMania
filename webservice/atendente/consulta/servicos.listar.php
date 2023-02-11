<?php

header('Access-Control-Allow-Origin: *');
header("content-type: application/json");
//header("Content-type: application/x-www-form-urlencoded");
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: *");

require_once '../../crud/atendente.crud.php';


echo json_encode(listarTodosServicos(),JSON_UNESCAPED_UNICODE);