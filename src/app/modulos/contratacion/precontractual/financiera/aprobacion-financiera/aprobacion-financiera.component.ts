import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

// Modelos
import { Presupuesto } from '../../models/Presupuesto';

// Servicios
import { global, GlobalService, FileUploadService } from 'src/app/services/services.index';
import { PresupuestoService } from '../../services/precontractual.services.index';

@Component({
	selector: 'app-aprobacion-financiera',
	templateUrl: './aprobacion-financiera.component.html',
	styles: []
})
export class AprobacionFinancieraComponent implements OnInit {
	bandera_inicial: boolean;
	documento_adjunto: File;
	documento_solicitud: string;
	global: any;
	mensaje_inicial: string;
	nombre_completo: string;
	presupuesto: Presupuesto;
	presupuesto_id: number;

	constructor(
		private _file_upload_service: FileUploadService,
		private _presupuesto_service: PresupuestoService,
		private _route: ActivatedRoute,
		private _router: Router,
	) {
		this.bandera_inicial = false;
		this.global = global;
	}

	ngOnInit(): void {
		this.obtenerInformacionInicial();
	}
	
	/**
	 * Función que reinicia los valores de las variables del formulario y redirige al usuario a la pantalla panel de solicitudes
	 * @name		cancelarSolicitud
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @returns 
	*/
	cancelarSolicitud() {
		this._router.navigate(['./contratacion/precontractual/panel-financiera']);
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
	descargarDocumento( documento: string ) {
		this._file_upload_service.descargarDocumento( documento, 'contratacion' ).subscribe(
			res => {
				window.open(`${global.url}upload/contratacion/${ documento }`);
			}
		);
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
			this.presupuesto_id = params['id'];

			Promise.all([ this.obtenerSolicitudPresupuesto( this.presupuesto_id )] )
				.then( responses => {
					this.presupuesto = responses[0];
					let segundo_nombre = this.presupuesto.solicitud_precontractual.segundo_nombre ? this.presupuesto.solicitud_precontractual.segundo_nombre + ' ' : '';
					let segundo_apellido = this.presupuesto.solicitud_precontractual.segundo_apellido ? this.presupuesto.solicitud_precontractual.segundo_apellido + ' ' : '';
					this.nombre_completo = this.presupuesto.solicitud_precontractual.primer_nombre + ' ' + segundo_nombre + this.presupuesto.solicitud_precontractual.primer_apellido + ' ' + segundo_apellido;
					this.bandera_inicial = true;
					if( this.presupuesto.solicitud_precontractual.documentos && this.presupuesto.solicitud_precontractual.documentos.length > 0 ) {
						this.presupuesto.solicitud_precontractual.documentos.forEach( documento => {
							if( (this.presupuesto.tipo_certificado == 1 && documento.id_documento == 2) || (this.presupuesto.tipo_certificado == 2 && documento.id_documento == 35) ) {
								this.documento_solicitud = documento.documento;					
							}
						});
					}
				})
				.catch( error => {
					this.mensaje_inicial = error;
					this.bandera_inicial = true;
				});
		});
		
	}
	
	/**
	 * Función que obtiene una solicitud presupuesto por el número de consecutivo
	 * @name		obtenerSolicitudPresupuesto
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * 
	 * @param 		{number} id
	 * @access		public
	*/
	obtenerSolicitudPresupuesto( id ): Promise< Presupuesto > {
		return new Promise((resolve, reject) => {
			this._presupuesto_service.obtenerSolicitudPresupuesto( id ).subscribe(
				res => {
					resolve( res.presupuesto );
				},
				error => {
					reject( error );
				}
			);
		});
	}
	
	/**
	 * Función que captura el evento submit de la vista
	 * @name		obtenerSolicitudPresupuesto
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * 
	 * @param 		{Form} presupuestoForm
	 * @access		public
	*/
	onSubmit(presupuestoForm) {
		this.presupuesto.estado = 2;
		
		this._file_upload_service.cargarArchivo( this.documento_adjunto, 'contratacion' )
			.then( res => {
				if( res.status == 'success' ) {
					// Asignar el nombre del archivo que devuelve la petición
					this.presupuesto.documento = res.nombre_archivo;
					this._presupuesto_service.actualizarSolicitudPresupuestal( this.presupuesto ).subscribe(
						res => {
							Swal.fire({
								position: 'center',
								icon: 'success',
								title: res.message,
								showConfirmButton: true,
							});
							presupuestoForm.reset();
							this.cancelarSolicitud();
						}
					);
				}
			})
			.catch( error => {
				console.log(error)
			});
	}
}
