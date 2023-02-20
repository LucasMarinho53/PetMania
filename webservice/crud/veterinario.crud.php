<?php

require('connection.php');

function atualizaFichaMedica($ficha){ #ok
    try{
        $con  = getConnection();

        $stmt =  $con->prepare("UPDATE ficha_medica SET
        diagnostico = :diagnostico,
        tratamento = :tratamento,
        prescricao = :prescricao,
        observacoes = :observacoes
        WHERE id_ficha = :id_ficha");

        $stmt->bindParam(":diagnostico",$ficha->diagnostico);
        $stmt->bindParam(":tratamento",$ficha->tratamento);
        $stmt->bindParam(":prescricao",$ficha->prescricao);
        $stmt->bindParam(":observacoes",$ficha->observacoes);
        $stmt->bindParam(":id_ficha",$ficha->id_ficha);

        if($stmt->execute()){
            return "success";
        }

    }

    catch(PDOException $error){
        return "Falha ao cadastrar a consulta/atendimento. Erro: {$error->getMessage()}";
    }
    finally{
        unset($cont);
        unset($stmt);
    }
}

function listaFichaID($busca)
{
    try{
        $con = getConnection();

        $stmt = $con->prepare("SELECT
        ficha_medica.id_ficha,
        ficha_medica.id_animal,
        ficha_medica.data_visita,
        ficha_medica.vet_id,
        ficha_medica.motivo_visita,
        ficha_medica.diagnostico,
        ficha_medica.tratamento,
        ficha_medica.prescricao,
        ficha_medica.observacoes,
        dono.email

        FROM ficha_medica
        LEFT JOIN animal ON ficha_medica.id_animal = animal.id_animal
LEFT JOIN dono ON animal.id_dono = dono.id_dono
        WHERE id_ficha = :termobusca");

        $stmt->bindParam(":termobusca",$busca);

        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_OBJ);

        return $row;
    }
    catch(PDOException $error){
        return "Falha ao procurar. Erro: {$error->getMessage()}";
    }
    finally{
        unset($cont);
        unset($stmt);
    }


}

function listarFichas($busca){
    try{
        $con = getConnection();

        $stmt = $con->prepare("SELECT DISTINCT
        id_ficha,
        data_visita,
        especie,
        nome_animal,
        Veterinario veterinario,
        nome_dono,
        motivo_visita
        FROM tudo_ficha
        WHERE nome_animal LIKE :termobusca
        OR nome_dono LIKE :termobusca
        OR id_ficha = :termobusca");


        if(is_numeric($busca)){
            $stmt->bindParam(":termobusca",$busca);
        }else{
            $stmt->bindValue(":termobusca","%{$busca}%");
        }


        $result = array();

            if($stmt->execute()) {
                if($stmt->rowCount() > 0) {
                    while($row = $stmt->fetch(PDO::FETCH_OBJ)){
                        array_push($result,$row);
                    }
                }
            }
        return $result;
    }
    catch(PDOException $error){
        return "Falha ao procurar. Erro: {$error->getMessage()}";
    }
    finally{
        unset($cont);
        unset($stmt);
    }
}
