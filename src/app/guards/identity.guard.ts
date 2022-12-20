import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../services/services.index';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class IdentityGuard implements CanActivate {

	constructor(
		private _user_service: UserService,
		private router: Router
	) {}

	canActivate() {
		const identity = this._user_service.obtenerIdentidadUsuarioLocal();

		if (identity) {
			let x_expiration = new Date(localStorage.getItem('x-expiration'));
			let fecha_actual = new Date();
			if( fecha_actual <= x_expiration ) {
				return true;
			} else {
				localStorage.clear();
				Swal.fire({
					position: 'center',
					icon: 'warning',
					title: 'Cierre de Sesión',
					html: 'Se ha vencido la vigencia de su sesión, por favor, inicie sesión nuevamente.',
					showConfirmButton: true,
				});
				this.router.navigate(['/login']);
				return false;
			}
		} else {
			this.router.navigate(['/login']);
			return false;
		}
	}
}
