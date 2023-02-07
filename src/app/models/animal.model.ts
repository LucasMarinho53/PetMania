import { Dono } from "./dono.model"
import { Raca } from "./raca.model"

export class Animal {
  nome_animal!: string
  sexo_animal!: string
  data_nasc!: Date
  id_dono!: Dono
  id_raca!: Raca
  id_animal?: number
}

