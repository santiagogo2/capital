import { Component, OnInit } from '@angular/core';

// Modelos
import { SolicitudPrecontractual } from '../../models/precontractual-models.index';

// Servicios
import { PrecontractualService } from '../../services/precontractual.services.index';

@Component({
	selector: 'app-panel-juridica',
	templateUrl: './panel-juridica.component.html',
	styles: []
})
export class PanelJuridicaComponent implements OnInit {
	bandera_inicial: boolean = false;
	items_por_pagina: number = 20;
	mensaje_inicial: boolean;
	pagina_actual: number;
	solicitudes: SolicitudPrecontractual[];

	constructor(
		private _precontractual_service: PrecontractualService,
	) {		
		let precontractual_pagina = +localStorage.getItem('juridica_pagina');
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
		localStorage.setItem( 'juridica_pagina', evento );
	}
	
	/**
	 * Función que obtiene la información inicial para inicializar la vista
	 * @name		obtenerInformacionInicial
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	*/
	obtenerInformacionInicial() {
		Promise.all([ this.obtenerSolicitudesJuridica()])		
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
	 * Promesa que retorna todas las solicitudes activas del sistema
	 * @name		obtenerSolicitudesJuridica
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @returns 
	*/
	obtenerSolicitudesJuridica(): Promise<SolicitudPrecontractual[]> {
		return new Promise( (resolve, reject) => {
			this._precontractual_service.obtenerSolicitudesJuridica().subscribe(
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
