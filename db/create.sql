

CREATE TABLE endereco(
    id_end		INT			auto_increment		PRIMARY KEY,
    cidade		VARCHAR(150),
    bairro		VARCHAR(150),
    logradouro	VARCHAR(150),
    numero		INT,
    cep			VARCHAR(9)
    );
    

CREATE TABLE dono(
id_dono		INT				auto_increment,
cpf			BIGINT 			unique,
nome		VARCHAR(150)	NOT NULL,
email		VARCHAR(50),
endereco	INT,
telefone	VARCHAR(20),
FOREIGN KEY(endereco) REFERENCES endereco(id_end),
PRIMARY KEY(id_dono)
);


    
    /*Criação da tabela dos animais*/
    
CREATE TABLE especie(
	id_especie		INT PRIMARY KEY auto_increment,
    nome_especie	VARCHAR(50)		NOT NULL
);

CREATE TABLE raca(
	id_raca			INT PRIMARY KEY auto_increment,
    id_especie		INT				NOT NULL,
    nome_raca		VARCHAR(50)		NOT NULL,
    FOREIGN KEY(id_especie) REFERENCES especie(id_especie)
);

CREATE TABLE animal(
	id_animal		INT			auto_increment		PRIMARY KEY,
    id_dono			INT			NOT NULL,
	nome			VARCHAR(50)	NOT NULL,
    sexo			CHAR(1)	NOT NULL,
    data_nasc		DATE,
    raca			INT,
    observacoes		VARCHAR(300),
    FOREIGN KEY(id_dono) REFERENCES dono(id_dono),
    FOREIGN KEY (raca) REFERENCES raca(id_raca)
);
    
  #Criação de views do animal
  #
  #
  #

/********************Criação Tabela Veterinário**********************************************/
CREATE TABLE veterinario(
id_vet		INT					auto_increment			PRIMARY KEY,
nome_vet	VARCHAR(150)		NOT NULL,
cpf			BIGINT				NOT NULL				unique,
crmv		BIGINT				NOT NULL,
email		VARCHAR(150),
telefone	VARCHAR(20),
endereco	INT,
FOREIGN KEY(endereco) REFERENCES endereco(id_end)
);



	


/*Criação Tabela ficha médica*/

CREATE TABLE ficha_medica(
	id_ficha		INT				auto_increment PRIMARY KEY,
    id_animal		INT				NOT NULL,
    data_visita		DATETIME		DEFAULT CURRENT_TIMESTAMP,
    vet_id			INT				NOT NULL,
    motivo_visita	VARCHAR(300)	DEFAULT	'rotina',
    diagnostico		VARCHAR(300)	DEFAULT NULL,
    tratamento		VARCHAR(300),
    prescricao		VARCHAR(300)	DEFAULT NULL,
    observacoes		VARCHAR(300)	DEFAULT NULL,
    FOREIGN KEY(id_animal) 	REFERENCES animal(id_animal),
    FOREIGN KEY(vet_id)		REFERENCES veterinario(id_vet)
);

	CREATE TABLE servico(
		id				INT			auto_increment	PRIMARY KEY,
		servico			VARCHAR(50)
    );
    
    
    /*-----------Tabelas Relação--------------------------*/
    
    CREATE TABLE fichaM_Servicos(
		id				INT			auto_increment	PRIMARY KEY,
		id_ficha_medica	INT,
		id_servico		INT,
		FOREIGN KEY(id_ficha_medica)	REFERENCES ficha_medica(id_ficha),
		FOREIGN KEY(id_servico) 		REFERENCES servico(id)
    );
    
   
    
    
    /*---------------------------*/
    

    /***********VIEWS DA PARTE DO ATENDENTE**************************/


/*-----View com tudo do Cliente------*/
CREATE VIEW tudo_dono AS

SELECT
dono.id_dono,
dono.cpf,
dono.Nome,
dono.email,
dono.endereco,
dono.telefone,

endereco.id_end,
endereco.cidade,
endereco.bairro,
endereco.logradouro,
endereco.numero,
endereco.cep,

animal.id_animal,
animal.nome nome_animal

FROM dono 
LEFT JOIN endereco
ON dono.endereco = endereco.id_end
RIGHT JOIN animal
ON dono.id_dono = animal.id_dono;



-- Criação de view dos dados básicos do cliente--

CREATE VIEW dados_cliente_id AS
SELECT id_dono,cpf, Nome, telefone, email,id_end,cidade,bairro,logradouro,numero,CEP FROM dono
JOIN endereco ON endereco.id_end = dono.endereco;



# ----- VIEW FICHAS MEDICAS (ATENDENTE) ----- #
CREATE VIEW fichas_Medicas AS	

SELECT ficha_medica.id_ficha,
 ficha_medica.data_visita,
 animal.nome nome_animal,
 animal.id_animal,
 ficha_medica.motivo_visita,
 veterinario.nome_vet veterinario, 
 dono.Nome nome_dono,
 servico.servico
FROM ficha_medica 
JOIN animal ON ficha_medica.id_animal = animal.id_animal 
JOIN dono ON animal.id_dono = dono.id_dono
JOIN veterinario ON ficha_medica.vet_id = veterinario.id_vet
JOIN ficham_servicos ON ficha_medica.id_ficha = ficham_servicos.id_ficha_medica
JOIN servico ON ficham_servicos.id_servico = servico.id;


--------- VIEW FICHAS listagem de animais -----------

CREATE VIEW tudo_animal AS
SELECT animal.id_animal id,
 animal.nome nome,
 animal.sexo sexo,
 animal.data_nasc data_Nascimento,
 animal.observacoes,
 raca.id_raca,
 raca.nome_raca raca,
 especie.nome_especie especie,
 especie.id_especie,
 dono.Nome dono,
 dono.id_dono
FROM animal
JOIN raca ON animal.raca = raca.id_raca
JOIN especie ON raca.id_especie = especie.id_especie
JOIN dono ON animal.id_dono = dono.id_dono;



/**************************************FIM VIEWS DA PARTE DO ATENDENTE*************************************************************/


-- precisa ser testarda
/*------ VIEW FICHA MÈDICA VETERINário*/

CREATE VIEW tudo_ficha AS

SELECT 
ficha_medica.id_ficha				id_ficha,
ficha_medica.data_visita			data_visita,
ficha_medica.vet_id					id_veterinario,
ficha_medica.motivo_visita			motivo_visita,
ficha_medica.diagnostico			diagnostico,
ficha_medica.tratamento				tratamento,
ficha_medica.prescricao				prescricao,
ficha_medica.observacoes			observacoes_ficha,

animal.id_animal					id_animal,
animal.id_dono						id_dono,
animal.nome							nome_aniaml,
animal.sexo							sexo,
animal.data_nasc					data_nascimento,
animal.observacoes					observacoes_animal,

raca.nome_raca						raca,
especie.nome_especie				especie,

dono.Nome							nome_dono,

veterinario.nome_vet 				veterinario,

servico.servico						servico


FROM ficha_medica 
LEFT JOIN animal ON ficha_medica.id_animal = animal.id_animal 
LEFT JOIN dono ON animal.id_dono = dono.id_dono
LEFT JOIN veterinario ON ficha_medica.vet_id = veterinario.id_vet
LEFT JOIN fichaM_Servicos ON ficha_medica.id_ficha = fichaM_Servicos.id_ficha_medica
LEFT JOIN servico ON fichaM_Servicos.id_servico = servico.id
LEFT JOIN raca ON animal.raca = raca.id_raca
LEFT JOIN especie ON raca.id_especie = especie.id_especie;










/* ************************VIEW ADD FICHA MÉDICA**************************/
CREATE VIEW liga_fichamedica AS
SELECT 
fichaM_Servicos.id_ficha_medica,
fichaM_Servicos.id_servico,
servico.servico nome_servico
FROM fichaM_Servicos JOIN servico
ON fichaM_Servicos.id_servico = servico.id; 