import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
	selector: 'app-contratacion',
	templateUrl: './contratacion.component.html',
	styles: []
})
export class ContratacionComponent implements OnInit {
	show: boolean;

	elementos_tarjeta: any[] = [
		{ titulo: 'Precontractual', descripcion: 'Prueba de la descripción', enlace: 'precontractual' },
	];


	constructor(
		private _router: Router
	) {
		this.getUrl().subscribe(
			res => {
				this.show = false;
				this.setBreadcrumbs(res);
			}
		);
	}
	
	ngOnInit(): void {
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
}
