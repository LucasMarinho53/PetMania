<?php

require('../../crud/atendente.crud.php');



if(isset($_GET['buscar']) && !empty($_GET['buscar']) && $_GET['buscar'] != NULL)
{
    echo json_encode(listaAnimais($_GET['buscar']));
}else
{
    echo json_encode(listaAnimais(''));
}
