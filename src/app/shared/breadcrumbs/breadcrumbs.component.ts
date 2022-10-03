import { Component, OnInit } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';
import { ActivationEnd, NavigationEnd, Router } from '@angular/router';

@Component({
	selector: 'app-breadcrumbs',
	templateUrl: './breadcrumbs.component.html',
	styles: []
})
export class BreadcrumbsComponent implements OnInit {
	titulo_pagina: string;
	url: string;
	breadcrumbs: any[];
	exceptions: string[];

	constructor(
		private _router: Router,
		private _title: Title,
		private _meta: Meta,
	) {
		this.exceptions = [''];

		this.obtenerDatosRuta().subscribe(
			response => {
				this.titulo_pagina = response.titulo;
				// Setea el titulo general del buscador
				this._title.setTitle( this.titulo_pagina );
				
				const metaTag: MetaDefinition = {
					name: 'description',
					content: this.titulo_pagina
				}

				this._meta.updateTag(metaTag);
			}
		);
		this.obtenerUrl().subscribe(
			res => {
				this.configurarMigasPan(res);
			}
		)
	}

	ngOnInit(): void {
	}

	/**
	 * Promesa que filtra y retorna la ruta de interés
	 * @name 		obtenerDatosRuta
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * 
	 * @returns 
	*/
	obtenerDatosRuta() {
		return this._router.events.pipe(
			// Si el evento es una instancia de ActivationEnd
			filter( event => event instanceof ActivationEnd ),
			filter( (event: ActivationEnd) => event.snapshot.firstChild == null ),
			map( (event: ActivationEnd) => event.snapshot.data )
		);
	}
	
	/**
	 * Promesa que filtra y retorna la ruta en la que se encuentra el usuario
	 * @name 		obtenerUrl
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * 
	 * @returns 
	*/
	obtenerUrl() {
		return this._router.events.pipe(
			filter( event => event instanceof NavigationEnd ),
			map( (event: NavigationEnd) => event.url )
		);
	}

	/**
	 * Función que configura los textos y enlaces que se van a visualizar en las migas de pan
	 * @name 		configurarMigasPan
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * 
	 * @param		{string} url
	 * 
	 * @returns 
	*/
	configurarMigasPan( url ) {
		let breadcrumbs_array = url.split( '/' );
		let breadcrumbs = new Array();
		let url_actual = '';

		breadcrumbs_array.forEach( element => {
			if( element && isNaN( element ) ) {
				let flag = true;
				for( let i = 0; i < this.exceptions.length; i++ ) {
					if( element === this.exceptions[i] ) {
						flag = false;
						break;
					}
				}

				if( flag ) {
					// Se crean las url dentro de un objeto
					let objeto = {};
					url_actual = url_actual + '/' + element;
					objeto[ 'url' ] = url_actual;

					// Se crean los textos del breadcrum dentro del objeto
					let segmentos = element.split('-');
					if( segmentos.length > 1 ) {
						let text = '';
						for( let i = 0; i < segmentos.length; i++ ) {
							text = text + ' ' + segmentos[i];
						}
						objeto['span'] = text.trim();
					} else {
						objeto['span'] = element;
					}
					breadcrumbs.push( objeto );
				}
			}
		});

		breadcrumbs.pop();
		this.breadcrumbs = breadcrumbs;
	}
}
