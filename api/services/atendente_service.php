<?php


//require("../repositories/atendente.crud");
require __DIR__ . DIRECTORY_SEPARATOR . "test.php";

require('./test.php');

/*
function listagemCliente($busca){    
    try{
        $lista =  listaClientes($busca);
        return json_encode($lista,JSON_UNESCAPED_UNICODE);
    }catch(Exception $error){
        return "{\"status\":\"Erro ao buscar. Erro: $error\"}";
    }

    
}
*/

function generate_path(...$segments) {

    return join(DIRECTORY_SEPARATOR, $segments);

}