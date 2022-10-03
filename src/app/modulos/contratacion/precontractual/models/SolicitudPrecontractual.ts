export class SolicitudPrecontractual {
	constructor(
		public id: number,
		public primer_nombre: string,
		public segundo_nombre: string,
		public primer_apellido: string,
		public segundo_apellido: string,
		public correo_electronico: string,
		public cargo: string,
		public area_solicitante: number,
		public descripcion_solicitud: string,
		public tipo_contrato: number,
		public documento_adjunto: string,
		public estado: number,
		public fecha_respuesta: string,
		public observaciones_juridica?: any,
		public fecha_comite_contratacion?: any,
		public documentos?: any,
		public presupuesto?: any[],
		public created_by?: number,
		public createdAt?: string,
		public updatedAt?: string,
	){}
}