import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

// Modelos
import { Documentacion, Presupuesto, SolicitudPrecontractual } from '../../models/precontractual-models.index';

// Servicios
import { FileUploadService, global, GlobalService } from '../../../../../services/services.index';
import { DocumentacionService, PrecontractualService, PresupuestoService, PrecontractualFunctionsService } from '../../services/precontractual.services.index';

@Component({
	selector: 'app-agregar-documentos',
	templateUrl: './agregar-documentos.component.html',
	styles: []
})
export class AgregarDocumentosComponent implements OnInit {
	@Input() solicitud: SolicitudPrecontractual;
	CDP: Presupuesto;
	documentacion: Documentacion;
	documentos_cargados: boolean;
	global: any = global;
	presupuesto: Presupuesto;
	documento_a_cargar: File;
	tipos_documentos: any;
	observacion: string;
	documento_cargado: boolean;

	constructor(
		private _documentacion_service: DocumentacionService,
		private _file_upload_service: FileUploadService,
		private _global_service: GlobalService,
		public precontractual_functions_service: PrecontractualFunctionsService,
		private _precontractual_service: PrecontractualService,
		private _presupuesto_service: PresupuestoService,
		private _router: Router,
	) {}

	ngOnInit(): void {
		this.configurarInformacionInicial();
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
		this._router.navigate(['./contratacion/precontractual/panel-solicitudes']);
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
		this.documento_cargado = false;

		if( this.solicitud.documentos && this.solicitud.documentos.length > 0 ) {
			let flag = false;
			let documentacion_id = null;
			let estado_documento = null;

			this.solicitud.documentos.forEach( element => {
				if( element.id_documento == id_documento ) {
					flag = true;
					documentacion_id = element.id;
					estado_documento = element.estado;
				}				
			});

			if( estado_documento == 3 ) {
				Swal.fire({
					position: 'center',
					icon: 'warning',
					title: 'El documento ya ha sido aprobado y no puede ser modificado',
					showConfirmButton: true,
				});
			}

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
								
								this.documento_a_cargar = null;
								this.obtenerSolicitud( this.solicitud.id );
								this.documento_cargado = true;
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

							this.obtenerSolicitud( this.solicitud.id );
							this.documento_cargado = true;
						}
					);
					(<HTMLInputElement>document.getElementById('documento_adjunto')).value = '';
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
		this.documentacion = new Documentacion( null, this.solicitud.id, null, null, 1, null, null, null, null );
		if( this.solicitud.presupuesto && this.solicitud.presupuesto.length > 0 ) {
			this.solicitud.presupuesto.forEach( (element: Presupuesto) => {
				if( element.tipo_certificado == 1 ) { this.CDP = element; }
			});
		}
		this.presupuesto = this.presupuesto ? this.presupuesto : new Presupuesto( null, this.solicitud.id, null, null, null, 1, null, null, null );
		this.documentos_cargados = this.solicitud.estado == 6 ? true : false;
		this.documento_a_cargar = null;
		this.formaterTiposDocumento();
	}
	
	/**
	 * Función que configura la observación del documento del usuario
	 * @name		configurarObservacion
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @returns 
	*/
	configurarObservacion( documentos: Documentacion[], id_documento: number ) {
		let observacion: string = null;

		documentos.forEach( documento => {
			if( documento.id_documento == id_documento ) {
				observacion = documento.observacion;
			}			
		});

		return( observacion );
	}
	
	/**
	 * Función que agrega una nueva solicitud de CDP 
	 * @name		crearCDPCRPPresupuesto
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @param 		{Form} datosCDPForm
	 * 
	 * @returns 
	*/
	crearCDPCRPPresupuesto( datosCDPForm ) {
		this._presupuesto_service.crearCDPCRPPresupuesto( this.presupuesto ).subscribe(
			res => {
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: res.message,
					showConfirmButton: true,
				});
				
				datosCDPForm.reset();
				this.obtenerSolicitud( this.solicitud.id );				
			}
		);
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
	 * Función que formatea los tipos de documentos que serán seleccionados por el usuario
	 * @name		formaterTiposDocumento
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @returns 
	*/
	formaterTiposDocumento() {
		let tipos_documentos = [];
		
		this.global.tipos_documentos.forEach( item => {
			if( (item.tipo_contrato == this.solicitud.tipo_contrato || !item.tipo_contrato) && item.id <= 28 ) {
				tipos_documentos.push( item );
			}
		});

		this.solicitud.documentos.forEach( documento => {
			for (let i = 0; i < tipos_documentos.length; i++) {
				if( documento.id_documento == tipos_documentos[i].id && documento.estado == 3 ) {
					tipos_documentos.splice(i,1);
					break;
				}
			}
		});

		this.tipos_documentos = tipos_documentos;
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
	obtenerSolicitud( id: number ) {
		this._precontractual_service.obtenerSolicitud( id ).subscribe(
			res => {
				this.solicitud = res.precontractual;
				this.formaterTiposDocumento();
				this.configurarInformacionInicial();
			},
			error => {
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: error,
					showConfirmButton: true,
				});
			}
		);
	}
	
	/**
	 * Función que recoge el evento submit del formulario y valida la documentación requerida para cada uno de los tipos de contrato
	 * @name		onSubmit
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @returns 
	*/
	onSubmit(){
	}
	
	/**
	 * Función que valida los documentos
	 * @name		validarDocumento
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @param 		{Array<Documentacion>} documentos
	 * @param 		{number} id_documento
	 * @param 		{boolean} bandera
	 * 
	 * @returns 
	*/
	validarDocumento( documentos: Array<Documentacion>, id_documento: number, bandera: boolean = false ){
		if( documentos && documentos.length > 0 ){
			let nombre_documento = null;

			documentos.forEach( documento => {
				if( documento.id_documento == id_documento ) {
					nombre_documento = documento.documento;					
				}
			});

			if( nombre_documento ) {
				if( bandera ) {
					return true;
				} else {
					return nombre_documento;
				}
			}

		}
		
		if( bandera ) {
			return false;
		} else {
			return '';
		}
	}
	
	/**
	 * Función que valida los estados de los documentos para permitir o no su edición
	 * @name		validarEstadoDocumento
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @param 		{Array<Documentacion>} documentos
	 * @param 		{number} id_documento
	 * @param 		{boolean} bandera
	 * 
	 * @returns 
	*/
	validarEstadoDocumento( documentos: Array<Documentacion>, id_documento: number, bandera: boolean = false): any{
		let flag = true;
		let estado: number = null;

		if( documentos && documentos.length > 0 ){
			documentos.forEach( documento => {
				if( documento.id_documento == id_documento ) {
					estado = documento.estado;
					if( documento.estado == 3 ) {
						flag = false;
					}
				}
			});
		}

		if( bandera ) { return estado }
		return flag;
	}
}
