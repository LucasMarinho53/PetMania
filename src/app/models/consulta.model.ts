import { Veterinario } from "./veterinario.model"

export class Consulta{
  id_ficha!: number
  data_visita!: Date
  especie!: string
  nome_animal!: string
  veterinario!: Veterinario
  nome_dono!: string
  motivo_visita!: string
}
