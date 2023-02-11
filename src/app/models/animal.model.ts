import { Dono } from "./dono.model"
import { Raca } from "./raca.model"

export class Animal {
  nome_animal!: string
  nome_especie!: string
  sexo_animal!: string
  data_nasc!: Date
  id_dono!: Dono
  nome_dono!: string
  nome_raca!: string
  id_raca!: Raca
  id_especie?: number
  id_animal?: number
}
