import { NgModule } from '@angular/core';

// Pipes
import { GlobalPipe } from './global.pipe';
import { IsNullFillPipe } from './is-null-fill.pipe';

@NgModule({
	declarations: [
		IsNullFillPipe,
		GlobalPipe,
	],
	imports: [
	],
	exports: [
		IsNullFillPipe,
		GlobalPipe,
	],
})
export class PipesModule {}
