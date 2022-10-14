import { Component, OnInit } from '@angular/core';

// Servicios
import { UserService } from 'src/app/services/services.index';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styles: []
})
export class HeaderComponent implements OnInit {
	usuario: any;

	constructor(
		private _user_service: UserService
	) {
		this.usuario = this._user_service.obtenerIdentidadUsuarioLocal();
	}
	
	ngOnInit(): void {
	}
}
