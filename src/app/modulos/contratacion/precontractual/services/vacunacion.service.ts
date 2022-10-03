import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Servicios
import { global } from 'src/app/services/services.index';

@Injectable({
	providedIn: 'root'
})
export class VacunacionService {
	url: string;
	url_login: string;
	url_service: string;
	headers: Object;

	constructor(
		private http: HttpClient,
	) {
		this.url = global.url;
		this.url_login = 'https://paiwebapi.paiweb.gov.co/api/login';
		this.url_service = 'https://paiwebws.paiweb.gov.co:8082';
		this.headers = {};
	}

    /**
	 * Servicio que inicia sesión en el web service del ministerio
	 * @name		iniciarSesionWebService
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @param 		{SolicitudPrecontractual} solicitud_precontractual
	 * 
	 * @returns 
	*/
    iniciarSesionWebService(): Observable<any> {
		const usuario = '1193533679';
		const password = 'Laura291218.';

		const objeto_sesion = {
			tipoIdentificacion: 'CC',
			Identificacion: usuario,
			Password: password
		};

        return this.http.post( this.url_login, objeto_sesion );
    }
	
	/**
	 * Servicio que guarda los datos del archivo en el web service del ministerio
	 * @name		guardarDatosWebService
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @param 		solicitud
	 * 
	 * @returns 
	*/
	guardarDatosWebService( solicitud, token ): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', `Bearer ${ token }` );
		solicitud.NroDocumento = solicitud.NroDocumento.toString();

		return this.http.post( '/api/interop/RegSolicitudCambioEstrategia', solicitud, {headers} );
	}
	
	/**
	 * Servicio que guarda los logs enviados por el webservice
	 * @name		guardarLogWebService
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @param 		respuesta_solicitud
	 * 
	 * @returns 
	*/
	guardarLogWebService( respuesta_solicitud ): Observable<any> {
		return this.http.post( `${ this.url }usuarios/vacunacion/webservice`, respuesta_solicitud );
	}
}
