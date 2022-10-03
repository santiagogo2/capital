import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

// Servicios
import { ExportService } from 'src/app/services/services.index';
import { VacunacionService } from '../services/precontractual.services.index';

@Component({
  selector: 'app-vacunacion',
  templateUrl: './vacunacion.component.html',
  styles: []
})
export class VacunacionComponent implements OnInit {
	bandera_inicial: boolean;
	datos_vacunacion: any;
	mensaje_respuesta: string;
	token_sesion: string;
	preloader_status: boolean;

	constructor(
		private _export_service: ExportService,
		private _vacunacion_service: VacunacionService,
	) { }

	ngOnInit(): void {
		this.iniciarSesionWebService()
			.then( token => {
				this.token_sesion = token;
				this.bandera_inicial = true;
			})
			.catch( error => {
				this.mensaje_respuesta = error;
			});
	}

	/**
	 * Función que verifica que las cabeceras ingresadas en el documento de excel sean las adecuadas para el cargue del archivo
	 * @name		agregarArchivo
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * 
	 * @param		event
	 * 
	 * @access		public
	*/	
	agregarArchivo(event) {
		const file = event.target.files[0];
		const fileReader = new FileReader();
		fileReader.readAsArrayBuffer( file );
		fileReader.onload = (element) => {
			let arrayBuffer: any;
			arrayBuffer = fileReader.result;
			const data = new Uint8Array( arrayBuffer );
			const arr = new Array();
			for (let  i = 0; i !== data.length; i++) {
				arr[i] = String.fromCharCode(data[i]);
			}
			const bstr = arr.join('');
			const workbook = XLSX.read(bstr, {type: "binary"});
			const first_sheet_name = workbook.SheetNames[0];
			const worksheet = workbook.Sheets[first_sheet_name];
			const arrayData = XLSX.utils.sheet_to_json(worksheet, {raw: true});
			const documentHeader = this.obtenerLlaves(arrayData[0]);
			let flag = false;

			documentHeader.forEach( head => { // Verificar las cabeceras del documento
				if (head.key === 'TipoDocumento' || head.key === 'NroDocumento' ||
					head.key === 'PrimerNombre' || head.key === 'PrimerApellido' ||
					head.key === 'FechaNacimiento' || head.key === 'Sexo' ||
					head.key === 'CodigoVacuna' || head.key === 'NroDosis' ||
					head.key === 'TipoEsquema' || head.key === 'CodigoEstrategia' ||
					head.key === 'FechaAplicacion' || head.key === 'CorreoElectronico' ) {
					flag = true;
				} else {
					flag = false;
				}
			});

			if (flag) {
				let datos = arrayData;
				datos.forEach( (dato: any) => {
					for ( const item in dato ) {
						if ( dato.hasOwnProperty(item) ) {
							if ( dato[item] == '' || dato[item] === 'null' || dato[item] === 'NULL' ) {
								dato[item] = null;
							}
						}
						dato.CodigoInstitucion = '110013029645';
					}
				});
				this.datos_vacunacion = datos;
			} else {
				this.mensaje_respuesta = 'Debe cargar el archivo con los índices correctos';
			}
		};
	}
	
	/**
	 * Función que consume el web service y espera hasta que el tamaño de las respuestas obtenidas sea igual al del array enviado al
	 * web service
	 * @name		esperarRespuestasWebService
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	*/
	esperarRespuestasWebService(): Promise< any > {
		let respuestas = [];

		return new Promise( (resolve) => {
			let contador = 0;
			let renovar_token = 0;
			let ejecucion = setInterval( () => {
				this.promesaRegistrarDatos( this.datos_vacunacion[contador] )
					.then( res => {
						respuestas.push( res );
						if( this.datos_vacunacion.length == respuestas.length ) {
							clearInterval( ejecucion );
							resolve( respuestas );
						}
						if( renovar_token == 100 ) {
							this.iniciarSesionWebService()
								.then( token => {
									this.token_sesion = token;
									renovar_token = 0;
								})
						}
						contador++;
						renovar_token++;
					});
			}, 500);
			// this.datos_vacunacion.forEach( dato => {
			// 	this.promesaRegistrarDatos( dato )
			// 		.then( res => {
			// 			respuestas.push( res );
			// 			if( this.datos_vacunacion.length == respuestas.length ) {
			// 				resolve( respuestas );
			// 			}
			// 		});
			// });
		});
	}	
	
	/**
	 * Exportar la información resultante del uso del webservice
	 * @name 		exportAsXLSX
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	*/
	exportAsXLSX( respuestas ) {
		let infoToExcelExport: any = respuestas;
		const names: any = {};
		names.documento = 'NÚMERO DE DOCUMENTO';
		names.idSolicitudCambio = 'ID DE LA SOLICITUD';
		names.estado = 'ESTADO DE LA SOLICITUD';
		names.mensaje = 'MENSAJE';

		infoToExcelExport.unshift(names);

		this._export_service.exportToExcelPlans(infoToExcelExport, 'Resultados WebService_');
	}

	/**
	 * Función que inicia sesión en el web service del ministerio
	 * @name		iniciarSesionWebService
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	*/	
	iniciarSesionWebService(): Promise< string > {
		return new Promise( (resolve, reject) => {
			this._vacunacion_service.iniciarSesionWebService().subscribe(
				res => {
					resolve( res.token );
				},
				error => {
					reject( 'No se ha podido iniciar sesión en el web service para poder hacer el cargue de la información' );
				}
			);
		})
	}
	
	/**
	 * Función que obtiene las llaves de los objetos ingresados
	 * @name		obtenerLlaves
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	*/	
	obtenerLlaves(obj) {
		return Object.keys(obj).map( x => {
			return {
				key: x,
				value: obj[x]
			};
		});
	}
	
	/**
	 * Función que registra los datos en el web service del ministerio
	 * @name		registrarDatos
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	*/
	registrarDatos() {
		this.preloader_status = true;

		this.esperarRespuestasWebService().then( respuesta => { 
			this.exportAsXLSX( respuesta );
			this.preloader_status = false;
			console.log(respuesta);
		});
	}
	
	/**
	 * Función que contiene una promesa que espera a que se resuelvan las peticiones para guardar los datos en la base de datos
	 * @name		promesaRegistrarDatos
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	*/
	promesaRegistrarDatos( dato ) {
		return new Promise( (resolve) => {
			this._vacunacion_service.guardarDatosWebService( dato, this.token_sesion ).subscribe(
				res => {
					let respuesta_solicitud = {
						documento: dato.NroDocumento,
						idSolicitudCambio: res.idSolicitudCambio,
						estado: res.mensaje[0],
						mensaje: res.mensaje[1],
					}
					resolve( respuesta_solicitud );
				},
				error => {
					let respuesta_solicitud = {
						documento: dato.NroDocumento,
						idSolicitudCambio: 'ERROR',
						estado: 'ERROR',
						mensaje: 'ERROR',
					}
					if( error.status == 401 )  {
						this.iniciarSesionWebService()
							.then( token => {
								this.token_sesion = token;
							});
					} else {
						resolve( respuesta_solicitud );
					}
				}
			);
		});
	}
}
