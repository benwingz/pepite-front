import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';

import { DropdownComponent } from './common/dropdown/dropdown.component';
import { BackToTopComponent } from './common/back-to-top/back-to-top.component';
import { CategoryComponent } from './common/category/category.component';
import { CommentComponent } from './common/comment/comment.component';
import { CommentlineComponent } from './common/commentline/commentline.component';
import { GradeComponent } from './common/grade/grade.component';

import { AuthService } from './service/auth.service';
import { ReferenceService } from './service/reference.service';
import { GradeService } from './service/grade.service';
import { CommentService } from './service/comment.service';

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
    PhaseComponent,
    CategoryComponent,
    CommentComponent,
    CommentlineComponent,
    GradeComponent
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
    AuthService,
    ReferenceService,
    GradeService,
    CommentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
