<?php
class Servico{
	public $idServico;
	public $servico;
	public $idFicha;
	
	public function __construct($idServico,$servico,$idFicha){
		$this->idServico = $idServico;
		$this->idFicha = $idFicha;
		$this->servico = $servico;
	}
	
	public function getIdServico() {
		return $this->idServico;
	}
	public function getServico() {
		return $this->servico;
	}
	public function getIdFicha() {
		return $this->idFicha;
	}



	public function setIdServico($idServico) {
		$this->idServico = $idServico;
	}
	public function setServico($servico) {
		$this->servico = $servico;
	}
	public function setIdFicha($idFicha) {
		$this->idFicha = $idFicha;
	}


	public function jsonSerialize(){
		return [
			"idServico"=>$this->idServico,
			"servico"=>$this->servico,
			"idFicha"=>$this->idFicha
		];
	}
}