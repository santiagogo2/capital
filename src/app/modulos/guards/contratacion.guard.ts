import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../../services/services.index';

@Injectable({
  providedIn: 'root'
})
export class ContratacionGuard implements CanActivate {

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
				if( grupos[i].cn == 'CON_CONTRATACION') {
					return true;
				}
			}
			this.router.navigate(['/inicio'])
			return false;
		} else {
			this.router.navigate(['/inicio']);
			return false;
		}
	}
}
