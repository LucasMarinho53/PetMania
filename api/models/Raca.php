<?php
class Raca{
	public $idRaca;
	public $idEspecie;
	public $nomeRaca;
	public $nomeEspecie;

	public function getIdRaca() {
		return $this->idRaca;
	}
	public function getIdEspecie() {
		return $this->idEspecie;
	}
	public function getNomeRaca() {
		return $this->nomeRaca;
	}
	public function getNomeEspecie() {
		return $this->nomeEspecie;
	}


	public function setIdRaca($idRaca) {
		$this->idRaca = $idRaca;
	}
	public function setIdEspecie($idEspecie) {
		$this->idEspecie = $idEspecie;
	}
	public function setNomeRaca($nomeRaca) {
		$this->nomeRaca = $nomeRaca;
	}
	public function setNomeEspecie($nomeEspecie) {
		$this->nomeEspecie = $nomeEspecie;
	}
}