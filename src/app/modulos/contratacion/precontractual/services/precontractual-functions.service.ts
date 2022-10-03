import { Injectable } from '@angular/core';

// Modelos
import { Documentacion, SolicitudPrecontractual } from '../models/precontractual-models.index';

// Servicios
import { FileUploadService, global } from 'src/app/services/services.index';
import { PrecontractualService } from './precontractual.service';

@Injectable({
	providedIn: 'root'
})
export class PrecontractualFunctionsService {

	constructor(
		private _file_upload_service: FileUploadService,
		private _precontractual_service: PrecontractualService,
	) { }
	
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
}
