<?php

require_once 'endereco.php';

class DonoAnimal extends Endereco{
    public $id_dono;
	public $cpf;
	public $nome;
	public $email;
	public $telefone;

    public function getId_dono() {
		return $this->id_dono;
	}
	public function getCpf() {
		return $this->cpf;
	}
	public function getNome() {
		return $this->nome;
	}
	public function getEmail() {
		return $this->email;
	}
	public function getTelefone() {
		return $this->telefone;
	}


    public function setId_dono($id_dono) {
		$this->id_dono = $id_dono;
	}
	public function setCpf($cpf) {
		$this->cpf = $cpf;
	}
	public function setNome($nome) {
		$this->nome = $nome;
	}
	public function setEmail($email) {
		$this->email = $email;
	}
	public function setTelefone($telefone) {
		$this->telefone = $telefone;
	}
}