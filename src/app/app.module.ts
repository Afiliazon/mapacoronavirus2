import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layouts/layout.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PerfectScrollbarModule, PerfectScrollbarConfigInterface,PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { TopbarComponent } from './layouts/topbar/topbar.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CountryComponent } from './pages/country/country.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CountupComponent } from './shared/countup/countup.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AdsenseModule } from 'ng2-adsense';
import {NgcCookieConsentModule, NgcCookieConsentConfig} from 'ngx-cookieconsent';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  };

  const cookieConfig:NgcCookieConsentConfig = {
    cookie: {
      domain: 'mapacoronavirus.live' // or 'your.domain.com' // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
    },
    palette: {
      popup: {
        background: '#000000',
        text: '#ffffff',
        link: '#ffffff'
      },
      button: {
        background: '#21afdd',
        text: '#ffffff',
        border: 'transparent'
      }
    },
    theme: 'edgeless',
    type: 'opt-out',
    layout: 'my-custom-layout',
    layouts: {
    "my-custom-layout": '{{messagelink}}{{compliance}}'
  },
  elements:{
    messagelink: `
    <span id="cookieconsent:desc" class="cc-message">{{message}} 
      <a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="{{cookiePolicyHref}}" target="_blank">{{cookiePolicyLink}}</a>, 
      <a aria-label="learn more about our privacy policy" tabindex="1" class="cc-link" href="{{privacyPolicyHref}}" target="_blank">{{privacyPolicyLink}}</a>     
    </span>
    `,
  },
  content:{
    message: 'Utilizamos cookies para asegurar que damos la mejor experiencia al usuario en nuestra web. Si sigues utilizando este sitio asumiremos que estás de acuerdo. ',
    dismiss: 'Acepto',
    deny: 'Quiero salir',
    cookiePolicyLink: 'Politica de Cookies',
    cookiePolicyHref: 'https://cookie.com',

    privacyPolicyLink: 'Privacidad',
    privacyPolicyHref: 'https://privacy.com',

    tosLink: 'Terms of Service',
    tosHref: 'https://tos.com',
  }
  };


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,TopbarComponent, NavbarComponent, FooterComponent, DashboardComponent, CountryComponent, NotFoundComponent, CountupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,CommonModule,
    RouterModule,
    PerfectScrollbarModule,
    NgcCookieConsentModule.forRoot(cookieConfig),
    ModalModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production, registrationStrategy: 'registerImmediately' }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    // shown passing global defaults (optional)
    AdsenseModule.forRoot({
      adClient: 'ca-pub-9611770290034128',
      adSlot: 7749816445,
    }),
  ],
  providers:[{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
