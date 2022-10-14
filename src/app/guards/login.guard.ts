import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// Servicios
import { UserService } from '../services/services.index';

@Injectable({
providedIn: 'root'
})
export class LoginGuard implements CanActivate {

	constructor(
		private _router: Router,
		private _user_service: UserService,
	) {}

	canActivate(){		
		const identity = this._user_service.obtenerIdentidadUsuarioLocal();

		if (!identity) {
			return true;
		} else {
			this._router.navigate(['/inicio']);
			return false;
		}
	}
}
