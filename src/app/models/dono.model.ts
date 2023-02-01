import { Endereco } from './endereco.model'

export class Dono {
  id_dono!: number
  cpf!: number
  nome_cliente!: string
  email!: string
  telefone!: string
  endereco!: Endereco
}
