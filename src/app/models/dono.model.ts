import { Endereco } from "./endereco.model";

export class Dono{
  cpf!:string;
  nome!:string;
  email!:string;
  telefone!:string;
  endereco!: Endereco;
  senha!:string;
}
