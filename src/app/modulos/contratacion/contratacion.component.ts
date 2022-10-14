import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

// servicios
import { UserService } from 'src/app/services/services.index';

@Component({
	selector: 'app-contratacion',
	templateUrl: './contratacion.component.html',
	styles: []
})
export class ContratacionComponent implements OnInit {
	show: boolean;

	elementos_tarjeta: any[] = [
		{ titulo: 'Contratos', descripcion: 'CapitalSalud EPS-S', enlace: 'precontractual' },
	];


	constructor(
		private _router: Router,
		private _user_service: UserService
	) {
		this.getUrl().subscribe(
			res => {
				this.show = false;
				this.setBreadcrumbs(res);
			}
		);
	}
	
	ngOnInit(): void {
		this.validarPermisos();
	}

	getUrl() {
		return this._router.events.pipe(
			filter( evento => evento instanceof NavigationEnd ),
			map( ( evento: NavigationEnd ) => evento.url )
		);
	}

	setBreadcrumbs(url) {
		const array = url.split('/');
		if ( array.length === 2 ) {
			if ( array[1] === 'contratacion' ) {
				this.show = true;
			}
		}
	}
	
	/**
	 * Función que valida los permisos del usuario para habilitarle cada uno de las opciones
	 * @name		autenticarUsuario
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @returns 
	*/
	validarPermisos() {
		const grupos = this._user_service.obtenerPermisosUsuario();
		const elementos_tarjeta = [];
		
		grupos.forEach( grupo => {			
			if ( grupo.cn == 'AP_GP_DGACIM' ) {
				elementos_tarjeta.push(this.elementos_tarjeta[0]);
			}			
		});

		this.elementos_tarjeta = elementos_tarjeta;
	}
}
