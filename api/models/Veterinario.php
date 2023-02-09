<?php

class Veterinario extends Endereco{
	public $idVet;
	public $nome;
	public $cpf;
	public $crmv;
	public $email;
	public $telefone;


	public function getIdVet() {
		return $this->idVet;
	}
	public function getNome() {
		return $this->nome;
	}
	public function getCpf() {
		return $this->cpf;
	}
	public function getCrmv() {
		return $this->crmv;
	}
	public function getEmail() {
		return $this->email;
	}
	public function getTelefone() {
		return $this->telefone;
	}

	public function setIdVet($idVet) {
		$this->idVet = $idVet;
	}
	public function setNome($nome) {
		$this->nome = $nome;
	}
	public function setCpf($cpf) {
		$this->cpf = $cpf;
	}
	public function setCrmv($crmv) {
		$this->crmv = $crmv;
	}
	public function setEmail($email) {
		$this->email = $email;
	}
	public function setTelefone($telefone) {
		$this->telefone = $telefone;
	}


}