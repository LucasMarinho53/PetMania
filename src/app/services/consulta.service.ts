import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consulta } from '../models/consulta.model';
import { HttpClient, HttpHeaders } from '@angular/common/http'

const API_URLS = {
  buscarVeterinario:
  'http://localhost/webservice/atendente/consulta/consulta.veterinario.listar.php',
cadastrarConsulta:
  'http://localhost/webservice/atendente/consulta/consulta.cadastrar.php',
listarConsulta:
  'http://localhost/webservice/atendente/consulta/consulta.listar.php',
listarServico:
  'http://localhost/webservice/atendente/consulta/servicos.listar.php',
cadastrarServico:
  'http://localhost/webservice/atendente/consulta/servicos.cadastrar.php',
servicoListarConsulta:
  'http://localhost/webservice/atendente/consulta/servicos.listar.consulta.php',
removerServico:
  'http://localhost/webservice/atendente/consulta/servicos.remover.php',
listarVeterinario:
  'http://localhost/webservice/veterinario/consulta.listar.php',
acharidConsulta:
  'http://localhost/webservice/veterinario/consulta.acharid.php',
atualizarConsulta:
  'http://localhost/webservice/veterinario/consulta.atualizar.php',
}

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE',
  }),
}

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  constructor(private http: HttpClient) { }

  getVeterinarioList(busca: any = ''): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(
      `${API_URLS.listarVeterinario}?buscar=${busca}`,
      HTTP_OPTIONS
    )
  }

  getFichaId(busca: any = ''): Observable<Consulta> {
    return this.http.get<Consulta>(
      `${API_URLS.acharidConsulta}?buscar=${busca}`,
      HTTP_OPTIONS
    )
  }

  updateFicha(cons: Consulta): Observable<any> {
    const {
      id_ficha,
      id_animal,
      vet_id,
      data_visita,
      motivo_visita,
      diagnostico,
      tratamento,
      prescricao,
      observacoes,
      especie,
      nome_animal,
      veterinario,
      nome_dono,
    } = cons
    const body = JSON.stringify({
      diagnostico,
      tratamento,
      prescricao,
      observacoes,
      id_ficha,
    })
    // this.updateClientFirebase(dono)
    // console.log(body)
    return this.http.post<any>(API_URLS.atualizarConsulta, body, HTTP_OPTIONS)
  }
}
