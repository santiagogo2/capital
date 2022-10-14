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

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _user_service: UserService,
	) {
		this.credenciales = {
			nombre_usuario: null,
			password: null,
		}
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
				localStorage.clear();

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
						const expirationtime = new Date( 1665471207 );
						localStorage.setItem('x-expiration', expirationtime.toString());
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
