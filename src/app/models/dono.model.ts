import { Endereco } from './endereco.model'

export class Dono {
  id_dono!: number
  cpf!: number
  Nome!: string
  email!: string
  endereco!: Endereco
  telefone!: string
}
