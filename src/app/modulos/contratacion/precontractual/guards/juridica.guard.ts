import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

// Servicios
import { UserService } from 'src/app/services/services.index';

@Injectable({
  providedIn: 'root'
})
export class JuridicaGuard implements CanActivate {

	constructor(
		private _user_service: UserService,
		private router: Router
	) {}
	
	/**
	 * Función que realiza la validación de acceso a cada uno de los módulos, si no tiene persisos, redirecciona a la pantalla principal del módulo
	 * @name		autenticarUsuario
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @returns 
	*/
	canActivate() {
		const grupos = this._user_service.obtenerPermisosUsuario();

		if (grupos) {
			for (let i = 0; i < grupos.length; i++) {
				if( grupos[i].cn == 'CON_JURIDICA') {
					return true;
				}
			}
			this.router.navigate(['/contratacion'])
			return false;
		} else {
			this.router.navigate(['/contratacion']);
			return false;
		}
	}
}
