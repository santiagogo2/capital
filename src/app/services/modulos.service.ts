import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

// Services
import { global } from '../services/global.service';

@Injectable({
	providedIn: 'root'
})
export class ModulosService {
	url: string;

	constructor(
		private _http: HttpClient,
	) {
		this.url = global.url;
	}
	
	/**
	 * Servicio que obtiene los modulos activos en el sistema
	 * @name		obtenerSolicitudesActivas
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @returns 
	*/
	obtenerSolicitudesActivas(): Observable<any> {
        return this._http.get( `${this.url}modulos` );
    }
}
