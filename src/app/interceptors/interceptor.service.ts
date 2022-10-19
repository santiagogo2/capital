import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';
import Swal from 'sweetalert2';

// Servicios
import { global } from '../services/services.index';

@Injectable({
	providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
	
	constructor() { }
	
	/**
	 * Función obligatoria del componente que hace el manejo de los errores y agrega los headers a las peticiones
	 * @name		intercept
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @param 		{HttpRequest} req
	 * @param 		{HttpHandler} next
	 * 
	 * @returns 
	*/
	intercept( req: HttpRequest<any>, next: HttpHandler): Observable< HttpEvent<any> > {
		const token = localStorage.getItem('x-token') ? localStorage.getItem('x-token') : null;
		const headers = new HttpHeaders({
			'x-token': token
		});
		
		let req_clone = req;
		if( token ) {
			req_clone = req.clone({
				headers
			});
		}
		return next.handle( req_clone ).pipe(
			catchError( this.manejarError )
		);
	}
	
	/**
	 * Función que maneja el error en todas las peticiones de la aplicación
	 * Se produce siempre un mensaje de error excepto cuando el servidor tenga la bandera secodary
	 * Cuando está activa la bandera secondary se maneja el mensaje de error con un alert en la vista
	 * @name		manejarError
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @param		{HttpErrorResponse} error
	 * 
	 * @returns 
	*/
	manejarError( error: HttpErrorResponse ) {		
		console.log(error);
		let message = global.error_message;
		let bandera_swal = true;
		if( error ) {
			if( error.error ) {
				message = error.error.message;
				if( error.error.secondary ) {
					bandera_swal = false;
				}
			}
			if (error.error.errores) {
				let claves = Object.keys( error.error.errores );
				message = '<b>Tiene los siguientes errores:</b><br>';
				claves.forEach( clave => {
					message += error.error.errores[clave].msg + '<br>';
				});
			}
		}
		if( bandera_swal ) {
			if( !error.error.code ) {
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: 'Error',
					html: message,
					showConfirmButton: true,
				});
			} else {
				if( error.error.code == 500 ) {
					Swal.fire({
						position: 'center',
						icon: 'error',
						title: 'Error',
						html: message,
						showConfirmButton: true,
					});
				} else {
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'Alerta',
						html: message,
						showConfirmButton: true,
					});
				}
			}
		}

		return throwError(message);
	}
}
