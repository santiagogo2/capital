import { Component, OnInit } from '@angular/core';
import { Modulo } from '../../models/models.index';
import { ModulosService } from '../../services/services.index';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
	modulos: Modulo[];

	constructor(
		private _modulos_service: ModulosService
	) { }
	
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
				this.modulos = res.modulos;
			}
		);
	}
}
