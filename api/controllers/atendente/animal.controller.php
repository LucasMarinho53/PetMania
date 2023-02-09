<?php

require_once '../../configs/configs.php';
require_once '../../services/atendente/animal.service.php';





if($_SERVER['REQUEST_METHOD'] == "GET"){
    if(isset($_GET['buscar']) && !empty($_GET['buscar'])){
        echo json_encode(getListaAnimal($_GET["buscar"]));
    }else{
        echo json_encode(getListaAnimal(''));
    }
    
}