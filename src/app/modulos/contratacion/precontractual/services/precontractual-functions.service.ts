import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

// Modelos
import { Documentacion, SolicitudPrecontractual } from '../models/precontractual-models.index';

// Servicios
import { FileUploadService, global } from 'src/app/services/services.index';
import { PrecontractualService } from './precontractual.service';
import { DocumentacionService } from './documentacion.service';

@Injectable({
	providedIn: 'root'
})
export class PrecontractualFunctionsService {

	constructor(
		private _documentacion_service: DocumentacionService,
		private _file_upload_service: FileUploadService,
		private _precontractual_service: PrecontractualService,
	) { }
	
	/**
	 * Función que carga el documento requerido por el usuario y actualiza el valor del documento en la base de datos
	 * @name		cargarDocumentoRequerido
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @param		{File} documento
	 * @param		{number} precontractual_id
	 * @param		{number} id_documento
	 * @param		{Documentacion[]} documentos
	 * @param		{boolean} show_message
	 * 
	 * @returns 
	*/
	cargarDocumentoRequerido( documento: File, precontractual_id: number, id_documento: number, etapa_contractual: number, documentos: Documentacion[], show_message: boolean = false ) {
		return new Promise( (resolve) => {
			let documento_nuevo: boolean = true;
			let documentacion: Documentacion = new Documentacion( null, +precontractual_id, null, null, etapa_contractual, null, null, null, null, null, null );
	
			if( documentos && documentos.length > 0 ) {
				const documento_resultante: Documentacion = documentos.find( documento => documento.id_documento == id_documento);
	
				if( documento_resultante && documento ) {
					documento_nuevo = false;

					if( documento_resultante.estado == 3 ) {
						Swal.fire({
							position: 'center',
							icon: 'warning',
							title: 'El documento ya ha sido aprobado y no puede ser modificado',
							showConfirmButton: true,
						});
						resolve(false);
					}

					this._file_upload_service.cargarArchivo( documento, 'contratacion' )
						.then( res => {
							if( res.status == 'success' ) {
								// Asignar el nombre del archivo que devuelve la petición
								documentacion.id = documento_resultante.id;
								documentacion.documento = res.nombre_archivo;
								documentacion.id_documento = id_documento;
			
								this._documentacion_service.actualizarDocumentoAdjunto( documentacion ).subscribe(
									res => {
										if( show_message ) {
											Swal.fire({
												position: 'center',
												icon: 'success',
												title: res.message,
												showConfirmButton: true,
											});
										}
										resolve(true);
									},
									error => {
										resolve(false);
									}
								);
							}
						})
						.catch( error => {
							console.log(error);
							resolve(false);
						});
				}			
			}
			
			if( documento_nuevo ) {
				this._file_upload_service.cargarArchivo( documento, 'contratacion' )
					.then( res => {
						if( res.status == 'success' ) {
							// Asignar el nombre del archivo que devuelve la petición
							documentacion.documento = res.nombre_archivo;
							documentacion.id_documento = id_documento;
		
							this._documentacion_service.crearDocumentoAdjunto( documentacion ).subscribe(
								res => {
									if( show_message ) {
										Swal.fire({
											position: 'center',
											icon: 'success',
											title: res.message,
											showConfirmButton: true,
										});
									}
									resolve(true);
								},
								error => {
									resolve(false);
								}
							);
						}
					})
					.catch( error => {
						console.log(error);
						resolve(false);
					});
			}
		});
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
	validarDocumento( solicitud: SolicitudPrecontractual, id_documento: number, bandera: boolean = false ){
		if( solicitud.documentos && solicitud.documentos.length > 0 ){
			let nombre_documento = null;

			solicitud.documentos.forEach( documento => {
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
	
	/**
	 * Función que valida las fechas para verificar el vencimiento de los documentos
	 * @name		validarVencimientoFechasDocumentos
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @param 		{string} vigencia
	 * @param 		{number} dias
	 * 
	 * @returns 
	*/
	validarVencimientoFechasDocumentos( vigencia: string, dias: number ) {
		const fecha_actual = new Date();
		const fecha_vigencia = new Date( vigencia );
		const dias_milisegundos = dias * 86400000;
		let resultado = fecha_actual.getTime() - fecha_vigencia.getTime();

		if( resultado < dias_milisegundos ) {
			return true;
		} else {
			return false;
		}
	}
}
