import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Modelos
import { SolicitudPrecontractual } from '../models/SolicitudPrecontractual';

// Services
import { global } from '../../../../services/services.index';

@Injectable({
	providedIn: 'root'
})
export class PrecontractualService {
	url: string;
	headers: Object;

	constructor(
		private http: HttpClient,
	) {
		this.url = global.url;
		this.headers = {};
	}
	
	/**
	 * Servicio que actualiza el estado de la solicitud precontractual enviada por la url
	 * @name		actualizarSolicitudPrecontractual
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @param 		{SolicitudPrecontractual} solicitud_precontractual
	 * 
	 * @returns 
	*/
	actualizarEstadoSolicitudPrecontractual( id, estado ): Observable<any> {
        return this.http.get( `${this.url}contratacion/precontractual/adicionales/actualizarEstadoSolicitudPrecontractual/${ id }/${ estado }` );
	}

    /**
	 * Servicio que actualiza la solicitud precontractual en el sistema
	 * @name		actualizarSolicitudPrecontractual
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @param 		{SolicitudPrecontractual} solicitud_precontractual
	 * 
	 * @returns 
	*/
    actualizarSolicitudPrecontractual( solicitud_precontractual: SolicitudPrecontractual ): Observable<any> {
		const id = solicitud_precontractual.id;

        return this.http.put( this.url + 'contratacion/precontractual/' + id, solicitud_precontractual, this.headers );
    }

    /**
	 * Servicio que crea una nueva solicitud precontractual en el sistema
	 * @name		crearSolicitudPrecontractual
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @param 		{SolicitudPrecontractual} solicitud_precontractual
	 * 
	 * @returns 
	*/
    crearSolicitudPrecontractual( solicitud_precontractual ): Observable<any> {
        return this.http.post( this.url + 'contratacion/precontractual', solicitud_precontractual, this.headers );
    }
	
	/**
	 * Servicio que elimina una solicitud precontractual del sistema
	 * @name		eliminarSolicitudPrecontractual
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @param 		{number} id
	 * 
	 * @returns 
	*/
	eliminarSolicitudPrecontractual( id: number ): Observable<any> {
        return this.http.delete( this.url + 'contratacion/precontractual/' + id, this.headers );
    }
	
	/**
	 * Servicio que obtiene las solicitudes precontractuales por el número de consecutivo
	 * @name		obtenerSolicitud
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @param 		{number} id
	 * 
	 * @returns 
	*/
	obtenerSolicitud( id: number ): Observable<any> {
        return this.http.get( this.url + 'contratacion/precontractual/' + id, this.headers );
    }
	
	/**
	 * Servicio que obtiene las solicitudes precontractuales activas
	 * @name		obtenerSolicitudesActivas
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @returns 
	*/
	obtenerSolicitudesActivas(): Observable<any> {
        return this.http.get( this.url + 'contratacion/precontractual/adicionales/obtenerSolicitudesActivas', this.headers );
    }
	
	/**
	 * Servicio que obtiene las solicitudes para el panel de jurídica
	 * @name		obtenerSolicitudesJuridica
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @returns 
	*/
	obtenerSolicitudesJuridica(): Observable<any> {
        return this.http.get( this.url + 'contratacion/precontractual/adicionales/obtenerSolicitudesJuridica', this.headers );
    }
	
	/**
	 * Servicio que obtiene las solicitudes precontractuales
	 * @name		obtenerSolicitudesPrecontractuales
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @returns 
	*/
	obtenerSolicitudesPrecontractuales(): Observable<any> {
        return this.http.get( this.url + 'contratacion/precontractual', this.headers );
    }
	
	/**
	 * Servicio que obtiene las solicitudes precontractuales del usuario logueado
	 * @name		obtenerSolicitudesPrecontractualesPorUsuario
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @returns 
	*/
	obtenerSolicitudesPrecontractualesPorUsuario(): Observable<any> {
        return this.http.get( this.url + 'contratacion/precontractual/adicionales/obtenerSolicitudesPrecontractualesPorUsuario', this.headers );
	}
}
