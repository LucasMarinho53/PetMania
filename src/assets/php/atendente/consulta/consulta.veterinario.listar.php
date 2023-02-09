<?php
require('../../crud/atendente.crud.php');


echo json_encode(listarVeterinarios(),JSON_UNESCAPED_UNICODE);