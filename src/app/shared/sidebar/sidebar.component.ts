import { Component, OnInit } from '@angular/core';
import { Modulo } from '../../models/models.index';

// Servicios
import { ModulosService, UserService } from '../../services/services.index';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
	modulos: Modulo[];
	usuario: any;

	constructor(
		private _modulos_service: ModulosService,
		private _user_service: UserService,
	) {
		this.usuario = this._user_service.obtenerIdentidadUsuarioLocal();
	}
	
	ngOnInit(): void {
		this.obtenerSolicitudesActivas();
		let logo_content = document.querySelector("#logo_content");
		let sidebar = document.querySelector('.sidebar');
		let page_wrapper = document.querySelector('#page_wrapper');
		let topbar = document.querySelector("#topbar");

		logo_content.addEventListener('click', () => {
			sidebar.classList.toggle('active');
			page_wrapper.classList.toggle('active');
			topbar.classList.toggle('active');
		});

	}
	
	/**
	 * Función que obtiene la información de los módulos activos en el sistema
	 * @name		obtenerSolicitudesActivas
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	*/
	obtenerSolicitudesActivas() {
		this._modulos_service.obtenerSolicitudesActivas().subscribe(
			res => {
				const modulos = res.modulos;
				const grupos = this._user_service.obtenerPermisosUsuario();
				let modulos_activos = [];

				grupos.forEach(grupo => {
					for (let i = 0; i < modulos.length; i++) {
						if( modulos[i].grupo == grupo.cn ) {
							modulos_activos.push( modulos[i] );
							break;
						}
					}
				});

				this.modulos = modulos_activos;
			}
		);
	}
}
