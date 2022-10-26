import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Modelos
import { Presupuesto } from '../models/precontractual-models.index';

// Services
import { global } from '../../../../services/services.index';

@Injectable({
	providedIn: 'root'
})
export class PresupuestoService {
	url: string;
	headers: Object;

	constructor(
		private http: HttpClient,
	) {
		this.url = global.url;
	}
	
	/**
	 * Servicio que actualiza la solicitud presupuestal enviada por la url
	 * @name		actualizarSolicitudPrecontractual
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @param 		{Presupuesto} presupuesto
	 * 
	 * @returns 
	*/
	actualizarSolicitudPresupuestal( presupuesto: Presupuesto ): Observable<any> {
        return this.http.put( `${this.url}contratacion/presupuesto/${ presupuesto.id }`, presupuesto );
	}

    /**
	 * Servicio que crea una nueva solicitud presupuestal
	 * @name		crearCDPCRPPresupuesto
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @param 		{Presupuesto} presupuesto
	 * 
	 * @returns 
	*/
    crearCDPCRPPresupuesto( presupuesto: Presupuesto ): Observable<any> {
        return this.http.post( `${this.url}contratacion/presupuesto`, presupuesto );
    }

	/**
	 * Servicio que obtiene todas las solicitudes para el área de presupuesto
	 * @name		obtenerSolicitudes
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @returns 
	*/
	obtenerSolicitudes(): Observable<any> {
		return this.http.get( `${this.url}contratacion/presupuesto/adicionales/obtenerSolicitudes` );
	}

	/**
	 * Servicio que obtiene las solicitudes activas para el área de presupuesto
	 * @name		obtenerSolicitudesActivas
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @returns 
	*/
	obtenerSolicitudesActivas(): Observable<any> {
		return this.http.get( `${this.url}contratacion/presupuesto/adicionales/obtenerSolicitudesActivas` );
	}
	
	/**
	 * Servicio que obtiene la solicitud por el id requerida por el usuario
	 * @name		obtenerSolicitudPresupuesto
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @param		{number} id
	 * 
	 * @returns 
	*/
	obtenerSolicitudPresupuesto( id ): Observable<any> {
		return this.http.get( `${this.url}contratacion/presupuesto/${id}` );
	}
}
