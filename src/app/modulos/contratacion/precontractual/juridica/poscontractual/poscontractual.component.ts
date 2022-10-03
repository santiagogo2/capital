import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

// Modelos
import { Documentacion, SolicitudPrecontractual } from '../../models/precontractual-models.index';

// Servicios
import { FileUploadService, global } from '../../../../../services/services.index';
import { DocumentacionService, PrecontractualFunctionsService } from '../../services/precontractual.services.index';

@Component({
	selector: 'app-poscontractual',
	templateUrl: './poscontractual.component.html',
	styles: []
})
export class PoscontractualComponent implements OnInit {
	bandera_inicial: boolean;
	documentacion: Documentacion;
	documento_a_cargar: File;
	global: any = global;
	mensaje_inicial: string;
	solicitud: SolicitudPrecontractual;
	solicitud_id: number;

	constructor(
		private _documentacion_service: DocumentacionService,
		private _file_upload_service: FileUploadService,
		public _precontractual_functions_services: PrecontractualFunctionsService,
		private _route: ActivatedRoute,
		private _router: Router,
	) { }

	ngOnInit(): void {
		this.obtenerInformacionInicial();
	}
	
	/**
	 * Función que carga el documento requerido por el usuario y actualiza el valor del documento en la base de datos
	 * @name		cargarDocumentoRequerido
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @param		{File} documento
	 * 
	 * @returns 
	*/
	cargarDocumentoRequerido( documento: File, id_documento: number ) {
		if( this.solicitud.documentos && this.solicitud.documentos.length > 0 ) {
			let flag = false;
			let documentacion_id = null;

			this.solicitud.documentos.forEach( element => {
				if( element.id_documento == id_documento ) {
					flag = true;
					documentacion_id = element.id;
				}				
			});

			if( flag && documento ) {
				this._file_upload_service.cargarArchivo( documento, 'contratacion' )
				.then( res => {
					if( res.status == 'success' ) {
						// Asignar el nombre del archivo que devuelve la petición
						this.documentacion.id = documentacion_id;
						this.documentacion.documento = res.nombre_archivo;
						this.documentacion.id_documento = id_documento;
	
						this._documentacion_service.actualizarDocumentoAdjunto( this.documentacion ).subscribe(
							res => {
								Swal.fire({
									position: 'center',
									icon: 'success',
									title: res.message,
									showConfirmButton: true,
								});
	
								this._precontractual_functions_services.obtenerSolicitud( this.solicitud.id )
									.then( response => {
										this.solicitud = response;
									});
							}
						);
					}
				})
				.catch( error => {
					console.log(error)
				});
				
				return;
			}
		}

		this._file_upload_service.cargarArchivo( documento, 'contratacion' )
			.then( res => {
				if( res.status == 'success' ) {
					// Asignar el nombre del archivo que devuelve la petición
					this.documentacion.documento = res.nombre_archivo;
					this.documentacion.id_documento = id_documento;

					this._documentacion_service.crearDocumentoAdjunto( this.documentacion ).subscribe(
						res => {
							Swal.fire({
								position: 'center',
								icon: 'success',
								title: res.message,
								showConfirmButton: true,
							});

							this._precontractual_functions_services.obtenerSolicitud( this.solicitud.id )
							.then( response => {
								this.solicitud = response;
							});
						}
					);
				}
			})
			.catch( error => {
				console.log(error)
			});
	}
	
	/**
	 * Función que configura la información inicial para el funcionamiento de la vista
	 * @name		configurarInformacionInicial
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @returns 
	*/
	configurarInformacionInicial() {
		this.documentacion = new Documentacion( null, this.solicitud.id, null, null, 3, 1, null, null, null );
	}
	
	/**
	 * Función que obtiene la información inicial para inicializar la vista
	 * @name		obtenerInformacionInicial
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	*/
	obtenerInformacionInicial() {
		this._route.params.subscribe( params => {
			this.solicitud_id = params['id'];

			Promise.all([ this._precontractual_functions_services.obtenerSolicitud( this.solicitud_id ) ] )
				.then( responses => {
					this.solicitud = responses[0];
					this.configurarInformacionInicial();
					if( this.solicitud.estado != 7 ) {
						Swal.fire({
							position: 'center',
							icon: 'warning',
							title: 'La solicitud no se ha finalizado y no puede agregar los documentos postcontractuales',
							showConfirmButton: true,
						})

						this._router.navigate(['contratacion/precontractual/panel-juridica']);
					}

					this.bandera_inicial = true;
				})
				.catch( error => {
					this.mensaje_inicial = error;
					this.bandera_inicial = true;
				});
		});		
	}
}
