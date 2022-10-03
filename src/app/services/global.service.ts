import { Injectable } from '@angular/core';

export var global = {
	url: 'http://localhost:4202/api/',
	appName: 'NOMBRE',
	salarioMinimo: 1000000,
	error_message: 'Error. Por favor revisar su conexión a internet y recargar la página',

	// Roles provicionales
	roles_provicionales: [
		{ id: 1, value: 'Solicitud Precontractual' },
		{ id: 2, value: 'Jurídica' },
	],

	// Contratación
	areas_contratacion: [
		{ id: 1, value: 'GG – Gerencia general' },
		{ id: 2, value: 'OGR – Oficina de gestión del riesgo' },
		{ id: 3, value: 'DHT – Dirección de talento humano' },
		{ id: 4, value: 'DAU – Dirección de atención al usuario' },
		{ id: 5, value: 'DTE – Dirección de tecnología' },
		{ id: 6, value: 'DME – Dirección médica' },
		{ id: 7, value: 'DJU – Dirección jurídica' },
		{ id: 8, value: 'DCM - Dirección de comunicaciones y mercadeo' },
		{ id: 9, value: 'DAF – Dirección administrativa y financiera' },
		{ id: 10, value: 'SSM – Subdirección sucursal Meta' },
		{ id: 11, value: 'DOP – Dirección de operaciones' },
		{ id: 12, value: 'DEP – Dirección de estrategia y planeación' },
		{ id: 13, value: 'OCI – Oficina de control interno' },
		{ id: 14, value: 'SSB – Subdirección sucursal Bogotá' },
	],
	tipos_contratos: [
		{ id: 1, value: 'Administrativo' },
		{ id: 2, value: 'Asistencial' },
	],
	estados_solicitud_precontractual: [
		{ id: 1, value: 'NUEVO' },
		{ id: 2, value: 'ANULADO' },
		{ id: 3, value: 'PENDIENTE' },
		{ id: 4, value: 'DEVUELTO' },
		{ id: 5, value: 'ELIMINADO' },
		{ id: 6, value: 'APROBADO' },
		{ id: 7, value: 'PERFECCIONADO' },
	],
	estados_presupuesto: [
		{ id: 1, value: 'PENDIENTE' },
		{ id: 2, value: 'ENTREGADO' },
	],
	estados_documentacion: [
		{ id: 1, value: 'NUEVO' },
		{ id: 2, value: 'DEVULETO' },
		{ id: 3, value: 'APROBADO' },
	],
	tipos_certificados: [
		{ id: 1, value: 'CDP' },
		{ id: 2, value: 'CRP' },
	],
	tipos_documentos: [
		{ id: 1, tipo_contrato: 1, value: 'F58 - LJ Formato Lista de Chequeo Precontractual Contratación Administrativa', required: true },
		{ id: 1, tipo_contrato: 2, value: 'F47 - LJ Formato Lista de Chequeo Contratación Directa Asistencial', required: true },
		{ id: 3, tipo_contrato: 1, value: 'F57 - LJ Formato Estudio Previo Contratación Administrativa', required: true },
		{ id: 3, tipo_contrato: 2, value: 'F63 - LJ Formato Estudios Previos Contratación Asistencial', required: true },
		{ id: 4, tipo_contrato: 1, value: 'F59 - LJ Formato Matríz de Riesgo para los Procesos de Contratación Administrativa', required: true },
		{ id: 4, tipo_contrato: 2, value: 'F60 - LJ Formato Matríz de Riesgo para los Procesos de Contratación Asistencial', required: true },
		{ id: 5, value: 'Análisis del sector', required: 1 },
		{ id: 6, value: 'Oferta de Servicios', required: 1 },
		{ id: 7, value: 'Certificado de existencia y representación legal', required: 1 },
		{ id: 8, value: 'Acta de autorización para que el representante legal pueda suscribir contratos' },
		{ id: 9, value: 'Resolución o Decreto de Nombramiento y acta de posesión' },
		{ id: 10, value: 'Registro Único Tributario - RUT expedido por la DIAN debidamento actualizado', required: true },
		{ id: 11, value: 'Fotocopia de la Cedula de Ciudadanía del representante legal', required: true },
		{ id: 12, value: 'Libreta Militar del representante legal (Hombre hasta 50 años)' },
		{ id: 13, tipo_contrato: 2, value: 'Registro Especial de Prestadores - REPS - Constancia de Habilitación de Servicios', required: 2 },
		{ id: 14, tipo_contrato: 2, value: 'Indicadores de Calidad en la prestación de los servicios de salud', required: 2 },
		{ id: 15, tipo_contrato: 2, value: 'Constancia pago contribución especial Supersalud y/o al Ente de Vigilancia Y control según aplique' },
		{ id: 16, tipo_contrato: 2, value: 'Visita Precontractual de Calidad', required: 2 },
		{ id: 17, tipo_contrato: 2, value: 'Certificación de Capacidad Instalada', required: 2 },
		{ id: 18, tipo_contrato: 2, value: 'Modelo de Prestación de Servicios', required: 2 },
		{ id: 19, tipo_contrato: 2, value: 'SOAT - En caso de servicios de transporte', required: 2 },
		{ id: 20, value: 'Certificado de antecedentes Diciplinarios expedidos por la Procuraduría General de la Nación', required: true },
		{ id: 21, value: 'Certificado de antecedentes Diciplinarios expedidos por la Personería Distrital', required: true },
		{ id: 22, value: 'Certificado de antecedentes Fiscales expedido por la Contraloría General de la República', required: true },
		{ id: 23, value: 'Certificado de antecedentes judiciales Policía Nacional', required: true },
		{ id: 24, value: 'Certificado de registro Nacional de Medidas Correctivas', required: true },
		{ id: 25, value: 'Formato de Declaración Juramentada de Inhabilidades e Incompatibilidades y Conflicto de Intereses', required: true },
		{ id: 26, value: 'Formato de conocimiento del cliente SARLAFT', required: true },
		{ id: 27, value: 'Póliza de responsabilidad civil clínica y hospitalidades', required: true },
		{ id: 28, value: 'Otros' },

		{ id: 29, value: 'Contrato', required: true },
		{ id: 30, value: 'Garantías', required: true },
		{ id: 31, value: 'Aprobación de Garantías', required: true },
		{ id: 32, value: 'Designación de Supervisión', required: true },
		{ id: 33, value: 'Publicación SECOP I Estado Celebrado', required: true },
		{ id: 34, value: 'Informes de Supervisión', required: true },
		{ id: 35, value: 'Justificación OtroSi', required: false },
		{ id: 36, value: 'Minuta Modificaciones', required: true },
		{ id: 37, value: 'Anexos', required: false },
		{ id: 38, value: 'Certificado de Registro Presupuestal CRP', required: true },

		{ id: 39, value: 'Memorando Solicitud Liquidación', required: true },
		{ id: 40, value: 'Informe Final Supervisor', required: true },
		{ id: 41, value: 'Certificado DAF', required: true },
		{ id: 42, value: 'Certificado DOP', required: true },
		{ id: 43, value: 'Acta de Liquidación o de Recibido a Satisfacción', required: true },
	]
}

@Injectable({
	providedIn: 'root'
})

export class GlobalService {
	addZero(numero: any) {
		if ( numero < 10 ) {
			numero = '0' + numero.toString();
		}
		return numero;
	}

	obtenerFechaActual() {
		const date = new Date();
		const day = this.addZero( date.getDate() );
		let month = date.getMonth() + 1;
		month = this.addZero( month );
		const year = date.getFullYear();
		return year + '-' + month + '-' + day;
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

	upperCase($event) {
		if ( $event ) {
			return $event.toUpperCase();
		}
	}
}