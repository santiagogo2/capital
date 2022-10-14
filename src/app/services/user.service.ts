import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Servicios
import { global } from 'src/app/services/global.service';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	url: string;

	constructor(
		private _http: HttpClient,
	) {
		this.url = global.url;
	}
	
	/**
	 * Servicio que autentica el usuario y retorna el token que será usado en el aplicativo
	 * @name		autenticarUsuario
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @returns 
	*/
	autenticarUsuario( credenciales ): Observable<any> {
        return this._http.post( `${this.url}usuarios/adicionales/autenticarUsuario`, credenciales );
    }
	
	/**
	 * Servicio que obtiene los datos del usuario contenidos en el x-token
	 * @name		obtenerIdentidadUsuario
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @returns 
	*/
	obtenerIdentidadUsuario(): Observable<any> {
        return this._http.get( `${this.url}usuarios/adicionales/obtenerIdentidadUsuario` );
    }

	/**
	 * Función que obtiene la identidad del usuario del local storage
	 * @name		obtenerIdentidadUsuario
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @returns 
	*/
	obtenerIdentidadUsuarioLocal() {
		const identity = JSON.parse(localStorage.getItem('x-usuario'));

		if (identity && identity !== undefined) {
			return identity
		} else {
			return null;
		}
	}

	/**
	 * Función que obtiene los permisos de grupos del usuario
	 * @name		obtenerPermisosUsuario
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @returns 
	*/
	obtenerPermisosUsuario() {		
		const identity = JSON.parse(localStorage.getItem('x-usuario'));

		if (identity && identity !== undefined) {
			if( identity.grupos ) {
				return identity.grupos;
			} else {
				return null;
			}
		} else {
			return null;
		}
	}
}
