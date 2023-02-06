import { Endereco } from './endereco.model'

export class Dono {
  id_dono!: number
  cpf!: number
  nome!: string
  email!: string
  telefone!: string
  endereco!: Endereco
}
