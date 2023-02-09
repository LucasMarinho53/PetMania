<?php
class Animal {
    public $idAnimal;
    public $idDono;
    public $nome;
    public $sexo;
    public $data_nascimento;
    public $observacoes;    
    public $dono;
    public $raca;

    

    public function setIdAnimal($id){
        $this->idAnimal = $id;
    }

    public function setIdDono($id){
        $this->idDono = $id;
    }

    public function setNome($nome){
        $this->nome = $nome;
    }

    public function setSexo($sexo){
        $this->sexo = $sexo;
    }

    public function setNascimento($nascimento){
        $this->data_nascimento = $nascimento;
    }

    public function setObservacoes($obs){
        $this->observacoes = $obs;
    }

    public function setDono($dono){
        $this->dono = $dono;
    }

    public function setRaca($raca){
        $this->raca = $raca;
    }



    //Getters
    public function getIdAnimal(){
        return $this->idAnimal;
    }

    public function getIdDono(){
        return $this->idDono;
    }

    public function getNome(){
        return $this->nome;
    }
    public function getSexo(){
        return $this->sexo;
    }
    public function getNascimento(){
        return $this->data_nascimento;
    }
    public function getRaca(){
        return $this->raca;
    }
    public function getObservcacoes(){
        return $this->observacoes;
    }
    public function getDono(){
        return $this->dono;
    }
}