import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppConfigService } from '../core/services/app-config.service';
import { ApiInterceptor } from '../core/interceptors/api-interceptor.interceptor';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptor,
    multi: true,
  },
];

/** App module. */
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    AppConfigService,
    ...httpInterceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
