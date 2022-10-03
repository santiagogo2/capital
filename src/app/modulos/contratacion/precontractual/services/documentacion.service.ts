import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Modelos
import { Documentacion } from '../models/precontractual-models.index';

// Services
import { global } from '../../../../services/services.index';

@Injectable({
	providedIn: 'root'
})
export class DocumentacionService {
	url: string;
	headers: Object;

	constructor(
		private http: HttpClient,
	) {
		this.url = global.url;
	}

    /**
	 * Servicio que actualiza el nombre del documento registrado
	 * @name		actualizarDocumentoAdjunto
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @param 		{Documentacion} documentacion
	 * 
	 * @returns 
	*/
    actualizarDocumentoAdjunto( documentacion: Documentacion ): Observable<any> {
        return this.http.put( this.url + 'contratacion/documentacion/adicional/' + documentacion.id, documentacion );
    }
	
	/**
	 * Servicio que actualiza el estado del documento adjunto
	 * @name		actualizarEstadoDocumentoAdjunto
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @param 		{Documentacion} documento
	 * 
	 * @returns 
	*/
	actualizarEstadoDocumentoAdjunto( documento: Documentacion ): Observable<any> {
		return this.http.put(`${this.url}contratacion/documentacion/adicional/actualizarEstadoDocumentoAdjunto/${documento.id}`, documento);
	}

    /**
	 * Servicio que crea un nuevo registro del documento cargado por el usuario
	 * @name		crearDocumentoAdjunto
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @param 		{Documentacion} documentacion
	 * 
	 * @returns 
	*/
    crearDocumentoAdjunto( documentacion: Documentacion ): Observable<any> {
        return this.http.post( this.url + 'contratacion/documentacion', documentacion );
    }
}
