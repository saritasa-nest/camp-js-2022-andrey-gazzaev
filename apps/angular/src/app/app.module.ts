import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppConfigService } from '../core/services/app-config.service';
import { AuthInterceptor } from '../core/interceptors/auth.interceptor';
import { RefreshInterceptor } from '../core/interceptors/refresh.interceptor';
import { ApiInterceptor } from '../core/interceptors/api.interceptor';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AnimeModule } from './features/anime/anime.module';

const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: RefreshInterceptor,
    multi: true,
  },
];

/** App module. */
@NgModule({
  declarations: [AppComponent],
  imports: [
    AnimeModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AppConfigService,
    ...httpInterceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
