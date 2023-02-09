<?php

require_once '../../crud/atendente.crud.php';


echo json_encode(listarTodosServicos(),JSON_UNESCAPED_UNICODE);