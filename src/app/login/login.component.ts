import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Servicios
import { UserService } from '../services/services.index';

interface Credenciales {
	nombre_usuario: string,
	password: string,
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	capital_loader: boolean;
	credenciales: Credenciales;
	recordarme_checkbox: boolean;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _user_service: UserService,
	) {
		let nombre_usuario = localStorage.getItem('nombre_usuario') ? localStorage.getItem('nombre_usuario') : null;
		this.credenciales = {
			nombre_usuario: nombre_usuario,
			password: null,
		}
		this.recordarme_checkbox = localStorage.getItem('recuerdame') == '1' ? true : false;
	}

	ngOnInit(): void {
		this.cerrarSesion();
	}
	
	/**
	 * Función que valida si el usuario quiere cerrar la sesión del aplicativo
	 * @name		guardarObservacionJuridica
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @returns 
	*/
	cerrarSesion() {		
		this._route.params.subscribe(params => {
			const logout = +params['sure'];

			if (logout === 1) {
				localStorage.removeItem('x-token');
				localStorage.removeItem('x-usuario');
				localStorage.removeItem('x-expiration');

				// Redirección al inicio
				this._router.navigate(['/login']);
			}
		});
	}
	
	/**
	 * Función que recibe el envento on submit del formulario y realiza la petición al servicio para iniciar sesión
	 * @name		guardarObservacionJuridica
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @param		{Form} juridicaForm
	 * 
	 * @returns 
	*/
	onSubmit( loginForm ) {
		this.capital_loader = true;
		this._user_service.autenticarUsuario( this.credenciales ).subscribe(
			res => {
				localStorage.setItem( 'x-token', res.token );
				this._user_service.obtenerIdentidadUsuario().subscribe(
					res => {
						localStorage.setItem('x-usuario', JSON.stringify(res.usuario.user));
						const expirationtime = new Date( new Date().getTime() + ((res.usuario.exp - res.usuario.iat)*1000) );
						localStorage.setItem('x-expiration', expirationtime.toString());
						let recuerdame = this.recordarme_checkbox ? '1' : '0';
						localStorage.setItem( 'recuerdame', recuerdame );
						if( this.recordarme_checkbox ) {
							localStorage.setItem('nombre_usuario', this.credenciales.nombre_usuario);
						} else {
							localStorage.setItem('nombre_usuario', '');
						}
						loginForm.reset();
						this._router.navigate(['/inicio']);
						this.capital_loader = false;
					},
					error => {
						this.capital_loader = false;
					}
				)
			},
			error => {
				this.capital_loader = false;
			}
		);
	}
}
