import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

// Modelos
import { ObservacionesJuridica, SolicitudPrecontractual } from '../../models/precontractual-models.index';

// Servicios
import { global, GlobalService, FileUploadService } from 'src/app/services/services.index';
import { PrecontractualService } from '../../services/precontractual.service';

@Component({
  selector: 'app-nueva-solicitud',
  templateUrl: './nueva-solicitud.component.html',
  styles: []
})
export class NuevaSolicitudComponent implements OnInit {
	bandera_disabled: boolean = false;
	bandera_inicial: boolean = true;
	bandera_juridica: boolean = false;
	documento_adjunto: File;
	global: any;
	mensaje_inicial: string = null;
	observaciones_juridica: ObservacionesJuridica;
	solicitud: SolicitudPrecontractual = null;

	// Documentos
	documento_1: File;

	constructor(
		private _file_upload_service: FileUploadService,
		public _global_service: GlobalService,
		private _precontractual_service: PrecontractualService,
		private _router: Router,
	) {
		this.global = global;
	}

	ngOnInit(): void {
		this.obtenerValoresInicial();
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
	 * Función que reinicia los valores de las variables del formulario y redirige al usuario a la pantalla panel de solicitudes
	 * @name		cancelarSolicitud
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @returns 
	*/
	cancelarSolicitud() {
		this.configurarInformacionInicial();
		this._router.navigate(['./contratacion/precontractual/panel-solicitudes']);
	}

	configurarCheckInput() {}

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
		this.solicitud = new SolicitudPrecontractual( null, null, null, null, null, null, null, null, null, null, null, null, null, null );
		this.observaciones_juridica = new ObservacionesJuridica( null, null, null, null, null, null );
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
	 * Función que carga toda la información inicial para el funcionamiento del formulario
	 * @name		obtenerValoresInicial
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @returns 
	*/
	obtenerValoresInicial() {
		this.configurarInformacionInicial();
	}

	/**
	 * Función que recibe el envento on submit del formulario y realiza la petición al servicio para guardar la información
	 * @name		onSubmit
	 * @author		Santiago Ramirez Gaitan <santiagooo42@gmail.com>
	 * @version		1.0.0
	 * @access		public
	 * 
	 * @returns 
	*/
	onSubmit( solicitudForm ) {
		this._file_upload_service.cargarArchivo( this.documento_adjunto, 'contratacion' )
			.then( res => {
				if( res.status == 'success' ) {
					// Asignar el nombre del archivo que devuelve la petición
					this.solicitud.documento_adjunto = res.nombre_archivo;
					this._precontractual_service.crearSolicitudPrecontractual( this.solicitud ).subscribe(
						res => {
							Swal.fire({
								position: 'center',
								icon: 'success',
								title: 'Se ha creado la solicitud precontractual correctamente en el sistema con el número de consectuvo ' + res.precontractual.id,
								showConfirmButton: true,
							});
							solicitudForm.reset();
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
