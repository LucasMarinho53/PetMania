<?php


// class Animal {
//     public $idAnimal;
//     private $idDono;
//     private $nome;

//     private $sexo;
//     private $data_nascimento;
//     private $observacoes;
    
//     private $dono;
//     private $raca;

//     function __construct()
//     {
        
//     }

//     public function setIdAnimal($id){
//         $this->idAnimal = $id;
//     }

//     public function setIdDono($id){
//         $this->idDono = $id;
//     }

//     public function setNome($nome){
//         $this->nome = $nome;
//     }

//     public function setSexo($sexo){
//         $this->sexo = $sexo;
//     }

//     public function setNascimento($nascimento){
//         $this->data_nascimento = $nascimento;
//     }

//     public function setObservacoes($obs){
//         $this->observacoes = $obs;
//     }

//     public function setDono($dono){
//         $this->dono = $dono;
//     }

//     public function setRaca($raca){
//         $this->raca = $raca;
//     }



//     //Getters
//     public function getIdAnimal(){
//         return $this->idAnimal;
//     }

//     public function getIdDono(){
//         return $this->idDono;
//     }

//     public function getNome(){
//         return $this->nome;
//     }
//     public function getSexo(){
//         return $this->sexo;
//     }
//     public function getNascimento(){
//         return $this->data_nascimento;
//     }
//     public function getRaca(){
//         return $this->raca;
//     }
//     public function getObservcacoes(){
//         return $this->observacoes;
//     }
//     public function getDono(){
//         return $this->dono;
//     }
// }

// class Endereco{
//     private $idEndereco;
// 	private $localidade;
// 	private $bairro;
// 	private $logradouro;
// 	private $numero;
// 	private $cep;


//     public function getIdEndereco() {
// 		return $this->idEndereco;
// 	}
// 	public function getCidade() {
// 		return $this->localidade;
// 	}
// 	public function getBairro() {
// 		return $this->bairro;
// 	}
// 	public function getLogradouro() {
// 		return $this->logradouro;
// 	}
// 	public function getNumero() {
// 		return $this->numero;
// 	}
// 	public function getCep() {
// 		return $this->cep;
// 	}


//     public function setIdEndereco($idEndereco) {
// 		$this->idEndereco = $idEndereco;
// 	}
// 	public function setCidade($cidade) {
// 		$this->localidade = $cidade;
// 	}
// 	public function setBairro($bairro) {
// 		$this->bairro = $bairro;
// 	}
// 	public function setLogradouro($logradouro) {
// 		$this->logradouro = $logradouro;
// 	}
// 	public function setNumero($numero) {
// 		$this->numero = $numero;
// 	}
// 	public function setCep($cep) {
// 		$this->cep = $cep;
// 	}

// }

// class DonoAnimal extends Endereco{
//     private $id_dono;
// 	private $cpf;
// 	private $nome;
// 	private $email;
// 	private $telefone;

//     public function getId_dono() {
// 		return $this->id_dono;
// 	}
// 	public function getCpf() {
// 		return $this->cpf;
// 	}
// 	public function getNome() {
// 		return $this->nome;
// 	}
// 	public function getEmail() {
// 		return $this->email;
// 	}
// 	public function getTelefone() {
// 		return $this->telefone;
// 	}


//     public function setId_dono($id_dono) {
// 		$this->id_dono = $id_dono;
// 	}
// 	public function setCpf($cpf) {
// 		$this->cpf = $cpf;
// 	}
// 	public function setNome($nome) {
// 		$this->nome = $nome;
// 	}
// 	public function setEmail($email) {
// 		$this->email = $email;
// 	}
// 	public function setTelefone($telefone) {
// 		$this->telefone = $telefone;
// 	}
// }

// class FichaAtendimento{
// 	private $idFicha;
// 	private $animal;
// 	private $data;
// 	private $veterinario;
// 	private $dono;
// 	private $motivoVisita;
// 	private $diagnostico;
// 	private $tratamento;
// 	private $prescricao;
// 	private $observacoes;

// 	public function getIdFicha() {
// 		return $this->idFicha;
// 	}
// 	public function getAnimal() {
// 		return $this->animal;
// 	}
// 	public function getData() {
// 		return $this->data;
// 	}
// 	public function getVeterinario() {
// 		return $this->veterinario;
// 	}
// 	public function getDono() {
// 		return $this->dono;
// 	}
// 	public function getMotivoVisita() {
// 		return $this->motivoVisita;
// 	}
// 	public function getDiagnostico() {
// 		return $this->diagnostico;
// 	}
// 	public function getTratamento() {
// 		return $this->tratamento;
// 	}
// 	public function getPrescricao() {
// 		return $this->prescricao;
// 	}
// 	public function getObservacoes() {
// 		return $this->observacoes;
// 	}


// 	public function setIdFicha($idFicha) {
// 		$this->idFicha = $idFicha;
// 	}
// 	public function setAnimal($animal) {
// 		$this->animal = $animal;
// 	}
// 	public function setData($data) {
// 		$this->data = $data;
// 	}
// 	public function setVeterinario($veterinario) {
// 		$this->veterinario = $veterinario;
// 	}
// 	public function setDono($dono) {
// 		$this->dono = $dono;
// 	}
// 	public function setMotivoVisita($motivoVisita) {
// 		$this->motivoVisita = $motivoVisita;
// 	}
// 	public function setDiagnostico($diagnostico) {
// 		$this->diagnostico = $diagnostico;
// 	}
// 	public function setTratamento($tratamento) {
// 		$this->tratamento = $tratamento;
// 	}
// 	public function setPrescricao($prescricao) {
// 		$this->prescricao = $prescricao;
// 	}
// 	public function setObservacoes($observacoes) {
// 		$this->observacoes = $observacoes;
// 	}






// }

// class Raca{
// 	private $idRaca;
// 	private $idEspecie;
// 	private $nomeRaca;
// 	private $nomeEspecie;

// 	public function getIdRaca() {
// 		return $this->idRaca;
// 	}
// 	public function getIdEspecie() {
// 		return $this->idEspecie;
// 	}
// 	public function getNomeRaca() {
// 		return $this->nomeRaca;
// 	}
// 	public function getNomeEspecie() {
// 		return $this->nomeEspecie;
// 	}


// 	public function setIdRaca($idRaca) {
// 		$this->idRaca = $idRaca;
// 	}
// 	public function setIdEspecie($idEspecie) {
// 		$this->idEspecie = $idEspecie;
// 	}
// 	public function setNomeRaca($nomeRaca) {
// 		$this->nomeRaca = $nomeRaca;
// 	}
// 	public function setNomeEspecie($nomeEspecie) {
// 		$this->nomeEspecie = $nomeEspecie;
// 	}
// }

// class Servico{
// 	private $idServico;
// 	private $servico;
// 	private $idFicha;
	
// 	public function __construct($idServico,$servico,$idFicha){
// 		$this->idServico = $idServico;
// 		$this->idFicha = $idFicha;
// 		$this->servico = $servico;
// 	}
	
// 	public function getIdServico() {
// 		return $this->idServico;
// 	}
// 	public function getServico() {
// 		return $this->servico;
// 	}
// 	public function getIdFicha() {
// 		return $this->idFicha;
// 	}



// 	public function setIdServico($idServico) {
// 		$this->idServico = $idServico;
// 	}
// 	public function setServico($servico) {
// 		$this->servico = $servico;
// 	}
// 	public function setIdFicha($idFicha) {
// 		$this->idFicha = $idFicha;
// 	}


// 	public function jsonSerialize(){
// 		return [
// 			"idServico"=>$this->idServico,
// 			"servico"=>$this->servico,
// 			"idFicha"=>$this->idFicha
// 		];
// 	}
// }

// class Veterinario extends Endereco{
// 	private $idVet;
// 	private $nome;
// 	private $cpf;
// 	private $crmv;
// 	private $email;
// 	private $telefone;


// 	public function getIdVet() {
// 		return $this->idVet;
// 	}
// 	public function getNome() {
// 		return $this->nome;
// 	}
// 	public function getCpf() {
// 		return $this->cpf;
// 	}
// 	public function getCrmv() {
// 		return $this->crmv;
// 	}
// 	public function getEmail() {
// 		return $this->email;
// 	}
// 	public function getTelefone() {
// 		return $this->telefone;
// 	}

// 	public function setIdVet($idVet) {
// 		$this->idVet = $idVet;
// 	}
// 	public function setNome($nome) {
// 		$this->nome = $nome;
// 	}
// 	public function setCpf($cpf) {
// 		$this->cpf = $cpf;
// 	}
// 	public function setCrmv($crmv) {
// 		$this->crmv = $crmv;
// 	}
// 	public function setEmail($email) {
// 		$this->email = $email;
// 	}
// 	public function setTelefone($telefone) {
// 		$this->telefone = $telefone;
// 	}


// }


