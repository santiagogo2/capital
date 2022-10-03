import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Modelos
import { ObservacionesJuridica } from '../models/precontractual-models.index';

// Services
import { global } from '../../../../services/services.index';

@Injectable({
	providedIn: 'root'
})
export class JuridicaService {
	url: string;
	headers: Object;

	constructor(
		private http: HttpClient,
	) {
		this.url = global.url;
	}

    /**
	 * Servicio que crea una nueva observación de la solicitud en el sistema
	 * @name		crearObservacionJuridica
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @param 		{ObservacionesJuridica} observaciones_juridica
	 * 
	 * @returns 
	*/
    crearObservacionJuridica( observaciones_juridica ): Observable<any> {
        return this.http.post( this.url + 'contratacion/juridica/' + observaciones_juridica.estado, observaciones_juridica );
    }
}
