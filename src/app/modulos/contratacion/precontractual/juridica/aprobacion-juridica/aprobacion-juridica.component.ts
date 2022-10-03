import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

// Modelos
import { ObservacionesJuridica, SolicitudPrecontractual, Documentacion, Presupuesto } from '../../models/precontractual-models.index';

// Servicios
import { global, GlobalService, FileUploadService } from 'src/app/services/services.index';
import { PrecontractualFunctionsService, PresupuestoService, PrecontractualService, DocumentacionService } from '../../services/precontractual.services.index';

@Component({
	selector: 'app-aprobacion-juridica',
	templateUrl: './aprobacion-juridica.component.html',
	styles: []
})
export class AprobacionJuridicaComponent implements OnInit {
	bandera_disabled: boolean;
	bandera_inicial: boolean;
	documento_adjunto: File;
	global: any;
	mensaje_inicial: string;
	nombre_completo: string;
	observaciones_juridica: ObservacionesJuridica;
	solicitud: SolicitudPrecontractual;
	solicitud_id: number;
	documento_preloader: boolean;
	documentacion: Documentacion;
	documento_seleccionado: Documentacion;
	documento_a_cargar: File;
	presupuesto: Presupuesto;
	CRP: Presupuesto;

	constructor(
		private _documentacion_service: DocumentacionService,
		private _file_upload_service: FileUploadService,
		public _global_service: GlobalService,
		public _precontractual_functions_services: PrecontractualFunctionsService,
		private _precontractual_service: PrecontractualService,
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
	 * Función que actualiza el estado del documento cuando es cambiado por el usuario
	 * @name		actualizarEstadoDocumentoAdjunto
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @param		{number} id
	 * @param		{number} estado
	 * 
	 * @returns 
	*/
	actualizarEstadoDocumentoAdjunto( documento ) {
		this.documento_preloader = true;

		this._documentacion_service.actualizarEstadoDocumentoAdjunto( documento ).subscribe(
			res => {
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: res.message,
					showConfirmButton: true,
				});
				this.documento_preloader = false;
				this.validarDocumentosAprovados();
			}
		);
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
		this._router.navigate(['./contratacion/precontractual/panel-juridica']);
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
		this.documentacion.etapa_contractual = 2;
		this.documentacion.estado = 1;
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
	 * Función que clasifica los documentos para retornar el nombre requerido por el usuario
	 * @name		clasificarDocumentos
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @param		{string} documento
	 * @param		{number} tipo_contrato
	 * 
	 * @returns 
	*/
	clasificarDocumentos( id_documento ) {
		let nombre_documento = null;

		this.global.tipos_documentos.forEach( element => {
			if( element.id == id_documento ) {
				if( element.tipo_contrato ) {
					if( element.tipo_contrato == this.solicitud.tipo_contrato ) {
						nombre_documento = element.value;
					}
				} else {
					nombre_documento = element.value;
				}
			}			
		});

		return nombre_documento;
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
		if( this.solicitud.presupuesto && this.solicitud.presupuesto.length > 0 ) {
			this.solicitud.presupuesto.forEach( (element: Presupuesto) => {
				if( element.tipo_certificado == 2 ) { this.CRP = element; }
			});
		}
		this.presupuesto = this.CRP ? this.CRP : new Presupuesto( null, this.solicitud.id, null, null, null, 2, null, null, null, null, null, null );
		this.documentacion = new Documentacion( null, this.solicitud.id, null, null, 2, null, null, null, null, null, null );
		this.documento_seleccionado = new Documentacion( null, this.solicitud.id, null, null, 2, null, null, null, null, null, null );
	}
	
	/**
	 * Función que agrega una nueva solicitud de CRP 
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
				this._precontractual_functions_services.obtenerSolicitud( this.solicitud.id )
					.then( solicitud => {
						this.solicitud = solicitud;
						this.configurarInformacionInicial();
					});				
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
			let id = params['id'];
			this.solicitud_id = id;

			Promise.all([ this._precontractual_functions_services.obtenerSolicitud( id )] )
				.then( responses => {
					this.solicitud = responses[0];
					this.bandera_disabled = this.solicitud.estado == 7 ? true : false;
					this.configurarInformacionInicial();
					this.validarDocumentacionCompleta();

					let segundo_nombre = this.solicitud.segundo_nombre ? this.solicitud.segundo_nombre + ' ' : '';
					let segundo_apellido = this.solicitud.segundo_apellido ? this.solicitud.segundo_apellido + ' ' : '';
					this.nombre_completo = this.solicitud.primer_nombre + ' ' + segundo_nombre + this.solicitud.primer_apellido + ' ' + segundo_apellido;

					this.bandera_inicial = true;
				})
				.catch( error => {
					this.mensaje_inicial = error;
					this.bandera_inicial = true;
				});
		});
		
	}
	
	/**
	 * Función que recibe el envento on submit del formulario y realiza la petición al servicio para guardar la observación o el cambio de estado realizado por jurídica
	 * @name		guardarObservacionJuridica
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @param		{Form} juridicaForm
	 * 
	 * @returns 
	*/
	onSubmit( juridicaForm ) {
		this._precontractual_service.actualizarSolicitudPrecontractual( this.solicitud ).subscribe(
			res => {
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: res.message,
					showConfirmButton: true,
				});
				juridicaForm.reset();
				this.cancelarSolicitud();
			}
		);
	}
	
	/**
	 * Función que obtiene del global los documentos requeridos en el proceso
	 * @name		validarDocumentacionCompleta
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @returns 
	*/
	validarDocumentacionCompleta(){
		if( this.solicitud.documentos && this.solicitud.documentos.length > 0 ) {
			const documentos_requeridos = [];
			this.global.tipos_documentos.forEach( item => {
				if( item.required && ( item.required == true || item.required == this.solicitud.tipo_contrato ) && item.id <= 28 ) {
					if( item.tipo_contrato ) {
						if( item.tipo_contrato == this.solicitud.tipo_contrato ) {
							documentos_requeridos.push( item );	
						}
					} else {
						documentos_requeridos.push( item );	
					}
				}
			});

			return documentos_requeridos;
		}
	}
	
	/**
	 * Función que valida si todos los documentos se encuentran en estado aprobado
	 * @name		validarDocumentosAprovados
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @returns 
	*/
	validarDocumentosAprovados() {
		if( this.solicitud.documentos && this.solicitud.documentos.length > 0 ) {
			let bandera = true;
			const documentos_requeridos = this.validarDocumentacionCompleta();

			this.solicitud.documentos.forEach( documento => {
				if( documento.estado != 3 && documento.etapa_contractual == 1 && documento.id_documento != 2 ) {
					bandera = false;
				}
			});
			if( bandera ) {
				documentos_requeridos.forEach( element => {
					let flag = false;
					this.solicitud.documentos.forEach( documento => {
						if( element.id == documento.id_documento ) {
							flag = true;
						}
					});
					bandera = !flag ? flag : bandera;
				});
				return bandera;
			} else {
				return false;
			}	
		}
		return false;
	}
	
	/**
	 * Función que valida si todos los documentos contractuales están cargados
	 * @name		validarDocumentosContractualesRequeridos
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @returns 
	*/
	validarDocumentosContractualesRequeridos() {
		let bandera = true;

		this.global.tipos_documentos.forEach( item => {
			if( item.id >= 29 && item.id <= 37 && item.required ) {
				let resultado = this.solicitud.documentos.filter( documento => {
					if( documento.id_documento == item.id ) {
						return true;
					}
				});
						
				if( resultado.length == 0 ) { bandera = false }			
			}
		});

		return bandera;
	}
}
