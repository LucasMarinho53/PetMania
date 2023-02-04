<?php

/*
retorna o verbo http requisitado
*/

if($_SERVER['REQUEST_METHOD'] === 'GET'){
    echo 'alo';
}
if($_SERVER['REQUEST_METHOD'] === 'POST'){
    
}
if($_SERVER['REQUEST_METHOD'] === 'PATCH'){
    
}
if($_SERVER['REQUEST_METHOD'] === 'PUT'){
    
}
if($_SERVER['REQUEST_METHOD'] === 'DELETE'){
    echo 'lambda';
}