import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: 'home', icon: 'home' },
    { title: 'Login', url: 'login', icon: 'person' },
    { title: 'Prontuário', url: 'prontuario', icon: 'folder-open' },
    { title: 'Agendar Consulta', url: 'agenda', icon: 'calendar' },
  ];

  constructor() {}
}
