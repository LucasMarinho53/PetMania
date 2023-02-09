<?php
    require_once '../../repositories/atendente.crud.php';

function getListaAnimal($buscar){

    $resultado = listaAnimais($buscar);
    

    $retornoResultado= array();

    foreach($resultado as $animal):
    $retorno = new Animal();

    $raca =new Raca();
    $raca->idRaca = $animal->id_raca;
    $raca->nomeRaca = $animal->Raca;

    $dono = new DonoAnimal();
    $dono->id_dono = $animal->id_dono;
    $dono->nome = $animal->dono;

    $retorno->idAnimal = $animal->id;
    $retorno->idDono = $animal->id_dono;
    $retorno->nome = $animal->nome;
    $retorno->sexo = $animal->sexo;
    $retorno->data_nascimento = $animal->nascimento;
    
    $retorno->dono = $dono;
    $retorno->raca = $raca;

    array_push($retornoResultado,$retorno);
    endforeach;
    

    return $retornoResultado;
}