export class Documentacion {
	constructor(
		public id: number,
		public precontractual_id: number,
		public id_documento: number,
		public documento: string,
		public etapa_contractual: number,
		public fecha_vigencia: number,
		public observacion: string,
		public estado: number,
		public created_by?: number,
		public createdAt?: string,
		public updatedAt?: string,
	){}
}