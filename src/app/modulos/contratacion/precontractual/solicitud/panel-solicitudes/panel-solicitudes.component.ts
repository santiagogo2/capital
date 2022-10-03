import { Component, OnInit } from '@angular/core';

// Modelos
import { SolicitudPrecontractual } from '../../models/precontractual-models.index';

// Servicios
import { PrecontractualService } from '../../services/precontractual.services.index';

@Component({
  selector: 'app-panel-solicitudes',
  templateUrl: './panel-solicitudes.component.html',
  styles: []
})
export class PanelSolicitudesComponent implements OnInit {
	bandera_inicial: boolean;
	items_por_pagina: number;
	mensaje_inicial: string;
	pagina_actual: number;
	solicitudes: SolicitudPrecontractual[];

	constructor(
		private _precontractual_service: PrecontractualService,
	) {
		this.bandera_inicial = false;
		this.items_por_pagina = 20;
		let precontractual_pagina = +localStorage.getItem('precontractual_pagina');
		this.pagina_actual = precontractual_pagina ? precontractual_pagina : 1;
	}

	ngOnInit(): void {
		this.obtenerInformacionInicial();
	}
	
	/**
	 * Función que captura el vento de paginación de la visa y conserva la página en la que se encuentra el usuario
	 * @name		cambiarPagina
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	*/	
	cambiarPagina( evento ) {
		this.pagina_actual = evento;
		localStorage.setItem( 'precontractual_pagina', evento );
	}
	
	/**
	 * Función que obtiene la información inicial para inicializar la vista
	 * @name		obtenerInformacionInicial
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	*/
	obtenerInformacionInicial() {
		Promise.all([ this.obtenerSolicitudesPrecontractualesPorUsuario()])		
			.then( responses => {
				this.solicitudes = responses[0];
				this.bandera_inicial = true;
			})
			.catch( error => {
				this.mensaje_inicial = error;
				this.bandera_inicial = true;
			});
	}
	
	/**
	 * Promesa que retorna las solicitudes precontractuales
	 * @name		obtenerSolicitudesProcontractuales
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @returns 
	*/
	obtenerSolicitudesProcontractuales(): Promise<any> {
		return new Promise((resolve, reject) => {
			this._precontractual_service.obtenerSolicitudesActivas().subscribe(
				res => {
					resolve( res.precontractuales );
				},
				error => {
					reject( error );
				}
			);
		})
	}
	
	/**
	 * Promesa que retorna todas las solicitudes del usuario logueado
	 * @name		obtenerSolicitudesPrecontractualesPorUsuario
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @returns 
	*/
	obtenerSolicitudesPrecontractualesPorUsuario(): Promise<SolicitudPrecontractual[]> {
		return new Promise( (resolve, reject) => {
			this._precontractual_service.obtenerSolicitudesPrecontractualesPorUsuario().subscribe(
				res => {
					resolve( res.precontractuales );
				},
				error => {
					reject( error );
				}
			);
		});
	}
}
