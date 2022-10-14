import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Modulos
import { AppRoutingModule } from './app-routing.module';
import { ModulosModule } from './modulos/modulos.module';

// Componentes
import { AppComponent } from './app.component';

// Servicios
import { InterceptorService } from './interceptors/interceptor.service';
import { LoginComponent } from './login/login.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		ModulosModule,
		AppRoutingModule,
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: InterceptorService,
			multi: true,
		}
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
