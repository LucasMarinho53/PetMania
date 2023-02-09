<?php
class FichaAtendimento{
	public $idFicha;
	public $animal;
	public $data;
	public $veterinario;
	public $dono;
	public $motivoVisita;
	public $diagnostico;
	public $tratamento;
	public $prescricao;
	public $observacoes;

	public function getIdFicha() {
		return $this->idFicha;
	}
	public function getAnimal() {
		return $this->animal;
	}
	public function getData() {
		return $this->data;
	}
	public function getVeterinario() {
		return $this->veterinario;
	}
	public function getDono() {
		return $this->dono;
	}
	public function getMotivoVisita() {
		return $this->motivoVisita;
	}
	public function getDiagnostico() {
		return $this->diagnostico;
	}
	public function getTratamento() {
		return $this->tratamento;
	}
	public function getPrescricao() {
		return $this->prescricao;
	}
	public function getObservacoes() {
		return $this->observacoes;
	}


	public function setIdFicha($idFicha) {
		$this->idFicha = $idFicha;
	}
	public function setAnimal($animal) {
		$this->animal = $animal;
	}
	public function setData($data) {
		$this->data = $data;
	}
	public function setVeterinario($veterinario) {
		$this->veterinario = $veterinario;
	}
	public function setDono($dono) {
		$this->dono = $dono;
	}
	public function setMotivoVisita($motivoVisita) {
		$this->motivoVisita = $motivoVisita;
	}
	public function setDiagnostico($diagnostico) {
		$this->diagnostico = $diagnostico;
	}
	public function setTratamento($tratamento) {
		$this->tratamento = $tratamento;
	}
	public function setPrescricao($prescricao) {
		$this->prescricao = $prescricao;
	}
	public function setObservacoes($observacoes) {
		$this->observacoes = $observacoes;
	}






}