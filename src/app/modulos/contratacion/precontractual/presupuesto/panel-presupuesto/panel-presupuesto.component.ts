import { Component, OnInit } from '@angular/core';

// Modelos
import { Presupuesto } from '../../models/Presupuesto';

// Servicios
import { PresupuestoService } from '../../services/precontractual.services.index';

@Component({
	selector: 'app-panel-presupuesto',
	templateUrl: './panel-presupuesto.component.html',
	styles: []
})
export class PanelPresupuestoComponent implements OnInit {
	bandera_inicial: boolean = false;
	items_por_pagina: number = 20;
	mensaje_inicial: string;
	pagina_actual: number;
	presupuestos: Presupuesto[];

	constructor(
		private _presupuesto_service: PresupuestoService
	) { }

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
		Promise.all([ this.obtenerSolicitudesActivas()])		
			.then( responses => {
				this.presupuestos = responses[0];
				if( this.presupuestos.length <= 0 ) {
					this.mensaje_inicial = 'En el momento, no hay solicitudes de presupuesto activas en el sistema';
				}
				this.bandera_inicial = true;
			})
			.catch( error => {
				this.mensaje_inicial = error;
				this.bandera_inicial = true;
			});
	}
	
	/**
	 * Promesa que consulta el servicio para obtener las solicitudes activas para el área de presupuesto
	 * @name		obtenerSolicitudesActivas
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	*/
	obtenerSolicitudesActivas(): Promise<Presupuesto[]> {
		return new Promise((resolve, reject) => {
			this._presupuesto_service.obtenerSolicitudesActivas().subscribe(
				res => {
					resolve( res.presupuestos );
				},
				error => {
					reject( error );
				}
			);
		});
	}
}
