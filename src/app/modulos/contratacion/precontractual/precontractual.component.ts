import { Component, OnInit } from '@angular/core';

// Servicios
import { UserService } from 'src/app/services/services.index';

@Component({
  selector: 'app-precontractual',
  templateUrl: './precontractual.component.html',
  styles: []
})
export class PrecontractualComponent implements OnInit {
	show: boolean;

	elementos_tarjeta: any[] = [
		{ titulo: 'Solicitudes', descripcion: 'Prueba de la descripción', enlace: 'panel-solicitudes' },
		{ titulo: 'Jurídica', descripcion: 'Prueba de la descripción', enlace: 'panel-juridica' },
		{ titulo: 'Financiera', descripcion: 'Prueba de la descripción', enlace: 'panel-financiera' },
	];

	constructor(
		private _user_service: UserService
	) {}
	
	ngOnInit(): void {
		this.validarPermisos();
	}
	
	/**
	 * Función que valida los permisos del usuario para habilitarle cada uno de las opciones
	 * @name		autenticarUsuario
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @returns 
	*/
	validarPermisos() {
		const grupos = this._user_service.obtenerPermisosUsuario();
		const elementos_tarjeta = [];
		
		grupos.forEach( grupo => {			
			if ( grupo.cn == 'CON_SOLICITUDES' ) {
				elementos_tarjeta.push(this.elementos_tarjeta[0]);
			}
			if ( grupo.cn == 'CON_JURIDICA' ) {
				elementos_tarjeta.push(this.elementos_tarjeta[1]);
			}
			if ( grupo.cn == 'CON_FINANCIERA' ) {
				elementos_tarjeta.push(this.elementos_tarjeta[2]);
			}			
		});

		this.elementos_tarjeta = elementos_tarjeta;
	}
}
