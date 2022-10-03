export class ObservacionesJuridica {
	constructor(
		public id: number,
		public precontractual_id: number,
		public observaciones: string,
		public estado?: string,
		public created_by?: string,
		public createdAt?: string,
		public updateddAt?: string,
	){}
}