import { Dono } from './dono.model'
import { Raca } from './raca.model'

export class Animal {
  id_animal!: number
  id_dono!: Dono
  nome!: string
  sexo!: string // 1 string
  data_nasc!: Date
  raca!: Raca
  observacoes!: string
}
