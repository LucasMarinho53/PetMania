<?php
class Endereco{
    public $idEndereco;
	public $localidade;
	public $bairro;
	public $logradouro;
	public $numero;
	public $cep;


    public function getIdEndereco() {
		return $this->idEndereco;
	}
	public function getCidade() {
		return $this->localidade;
	}
	public function getBairro() {
		return $this->bairro;
	}
	public function getLogradouro() {
		return $this->logradouro;
	}
	public function getNumero() {
		return $this->numero;
	}
	public function getCep() {
		return $this->cep;
	}


    public function setIdEndereco($idEndereco) {
		$this->idEndereco = $idEndereco;
	}
	public function setCidade($cidade) {
		$this->localidade = $cidade;
	}
	public function setBairro($bairro) {
		$this->bairro = $bairro;
	}
	public function setLogradouro($logradouro) {
		$this->logradouro = $logradouro;
	}
	public function setNumero($numero) {
		$this->numero = $numero;
	}
	public function setCep($cep) {
		$this->cep = $cep;
	}

}