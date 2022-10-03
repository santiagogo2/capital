import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

// Services
import { global } from '../services/global.service';

@Injectable({
	providedIn: 'root'
})
export class FileUploadService {
	url: string;

	constructor(
		private _http: HttpClient,
	) {
		this.url = global.url;
	}
	
	/**
	 * Servicio que guarda el archivo en el servidor
	 * @name		cargarArchivo
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @returns 
	*/
	async cargarArchivo( archivo: File, modulo: 'contratacion' ) {
		try {
			const url = `${ this.url }upload/${ modulo }`;
			const form_data = new FormData();
			form_data.append( 'archivo', archivo );

			const resp = await fetch( url, {
				method: 'POST',
				body: form_data
			});

			const data = await resp.json();
			if( data.status == 'error' ) {
				Swal.fire({
					position: 'center',
					icon: 'warning',
					title: 'Error al cargar el archivo seleccionado',
					text: data.message,
					showConfirmButton: true,
				});
			}
			return data;
		} catch (error) {
			console.log(error);			
		}
	}

	/**
	 * Servicio que consulta el documento indicado por el usuario
	 * @name		descargarDocumento
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @returns 
	*/
	descargarDocumento( archivo: string, modulo: 'contratacion' ): Observable<any> {
        return this._http.get( `${this.url}upload/${ modulo }/${ archivo }`, {responseType: 'blob'} );
	}
}
