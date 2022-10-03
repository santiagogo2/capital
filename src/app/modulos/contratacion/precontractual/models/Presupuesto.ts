export class Presupuesto {
	constructor(
		public id: number,
		public precontractual_id: number,
		public descripcion: string,
		public documento: string,
		public motivo: string,
		public tipo_certificado: number,
		public estado: number,
		public solicitud_precontractual?: any,
		public documentos?: any,
		public created_by?: number,
		public createdAt?: number,
		public updatedAt?: number,
	){}
}