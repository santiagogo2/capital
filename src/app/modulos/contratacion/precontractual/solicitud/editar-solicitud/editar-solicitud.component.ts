import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

// Modelos
import { ObservacionesJuridica, SolicitudPrecontractual } from '../../models/precontractual-models.index';

// Servicios
import { global, GlobalService, FileUploadService } from 'src/app/services/services.index';
import { PrecontractualService } from '../../services/precontractual.service';

@Component({
  selector: 'app-editar-solicitud',
  templateUrl: '../nueva-solicitud/nueva-solicitud.component.html',
  styles: []
})
export class EditarSolicitudComponent implements OnInit {
	bandera_disabled: boolean;
	bandera_inicial: boolean;
	bandera_juridica: boolean;
	documento_adjunto: File;
	global: any;
	mensaje_inicial: string;
	observaciones_juridica: ObservacionesJuridica;
	solicitud: SolicitudPrecontractual;

	// Documentos
	documento_1: File;

	constructor(
		private _file_upload_service: FileUploadService,
		public _global_service: GlobalService,
		private _precontractual_service: PrecontractualService,
		private _route: ActivatedRoute,
		private _router: Router,
	) {
		this.global = global;
		this.bandera_disabled = true;
		this.bandera_inicial = false;
		this.bandera_juridica = false;
		this.mensaje_inicial = null;
	}

	ngOnInit(): void {
		this.mensaje_inicial = null;
		this.obtenerInformacionInicial();
	}
	
	/**
	 * Función que le asigna a una varibale el documento adjunto que ha seleccionado el usuario
	 * @name		cambiarDocumento
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @param		{File} file
	 * 
	 * @returns 
	*/
	cambiarDocumento( file: File ) {
		this.documento_adjunto = file;
	}
	
	/**
	 * Función que redirige al usuario a la pantalla panel de solicitudes
	 * @name		cancelarSolicitud
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @returns 
	*/
	cancelarSolicitud() {
		this._router.navigate(['./contratacion/precontractual/panel-solicitudes']);
	}
	
	/**
	 * Función que valida la existencia del documento y si existe lo abre en una pestaña nueva para su descarga
	 * @name		descargarDocumento
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @returns 
	*/
	descargarDocumento() {
		this._file_upload_service.descargarDocumento( this.solicitud.documento_adjunto, 'contratacion' ).subscribe(
			res => {
				window.open(`${global.url}upload/contratacion/${ this.solicitud.documento_adjunto }`);
			}
		);
	}
	
	/**
	 * Función que recibe el envento on submit del formulario y realiza la petición al servicio para guardar la observación o el cambio de estado realizado por jurídica
	 * @name		guardarObservacionJuridica
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @param		{Form} solicitudForm
	 * 
	 * @returns 
	*/
	guardarObservacionJuridica( juridicaForm ) {}
	
	/**
	 * Función que obtiene la información inicial para inicializar la vista
	 * @name		obtenerInformacionInicial
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	*/
	obtenerInformacionInicial() {
		this._route.params.subscribe( params => {
			let id = params['id'];

			Promise.all([ this.obtenerSolicitud( id )] )
				.then( responses => {
					this.solicitud = responses[0];
					if( this.solicitud.estado == 1 && !this.solicitud.observaciones_juridica ) {
						this.bandera_disabled = false;
					}
					this.bandera_inicial = true;
				})
				.catch( error => {
					this.mensaje_inicial = error;
					this.bandera_inicial = true;
				});
		});
		
	}
	
	/**
	 * Promesa que retorna lla solicitud requerida en la url
	 * @name		obtenerSolicitud
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @returns 
	*/
	obtenerSolicitud( id: number ): Promise< SolicitudPrecontractual > {
		return new Promise((resolve, reject) => {
			this._precontractual_service.obtenerSolicitud( id ).subscribe(
				res => {
					resolve( res.precontractual );
				},
				error => {
					reject( error );
				}
			);
		});
	}

	/**
	 * Función que recibe el envento on submit del formulario y realiza la petición al servicio para actualizar la información
	 * @name		onSubmit
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @returns 
	*/
	onSubmit( solicitudForm ) {
		if( this.documento_adjunto ) {
			this._file_upload_service.cargarArchivo( this.documento_adjunto, 'contratacion' )
				.then( res => {
					if( res.status == 'success' ) {
						// Asignar el nombre del archivo que devuelve la petición
						this.solicitud.documento_adjunto = res.nombre_archivo;
						this.solicitud.observaciones_juridica = null;
						
						this._precontractual_service.actualizarSolicitudPrecontractual( this.solicitud ).subscribe(
							res => {
								Swal.fire({
									position: 'center',
									icon: 'success',
									title: 'Se ha actualizado la solicitud con el número de consecutivo ' + this.solicitud.id,
									showConfirmButton: true,
								});
								solicitudForm.reset();
								this.cancelarSolicitud();
							}
						);
					}
				})
				.catch( error => {
					console.log(error);
				});
		} else {
			this._precontractual_service.actualizarSolicitudPrecontractual( this.solicitud ).subscribe(
				res => {
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: 'Se ha actualizado la solicitud con el número de consecutivo ' + this.solicitud.id,
						showConfirmButton: true,
					});
					solicitudForm.reset();
					this.cancelarSolicitud();
				}
			);
		}
	}
}
