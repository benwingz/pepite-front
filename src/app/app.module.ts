import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';

import { DropdownComponent } from './common/dropdown/dropdown.component';
import { BackToTopComponent } from './common/back-to-top/back-to-top.component';

import { SessionService } from './service/session.service';
import { UserService } from './service/user.service';
import { ReferenceService } from './service/reference.service';
import { GradeService } from './service/grade.service';

import { EvaluatedGradePipe } from './pipes/evaluatedgrade.pipe'

import { HomeComponent } from './pages/home/home.component';
import { PhaseComponent } from './pages/phase/phase.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
		tokenGetter: (() => sessionStorage.getItem('token'))
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    DropdownComponent,
    BackToTopComponent,
    HomeComponent,
    EvaluatedGradePipe,
    PhaseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [{
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    SessionService,
    UserService,
    ReferenceService,
    GradeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
