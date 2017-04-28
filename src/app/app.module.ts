import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';

import { AppConfig } from './app.config';

import { DropdownComponent } from './common/dropdown/dropdown.component';
import { BackToTopComponent } from './common/back-to-top/back-to-top.component';
import { CategoryComponent } from './common/category/category.component';
import { CommentComponent } from './common/comment/comment.component';
import { CommentlineComponent } from './common/commentline/commentline.component';
import { GradeComponent } from './common/grade/grade.component';
import { GlobalPhaseComponent } from './common/global-phase/global-phase.component';
import { UserstatComponent } from './common/userstat/userstat.component';
import { UserlistComponent } from './common/userlist/userlist.component';

import { AuthService } from './service/auth.service';
import { ReferenceService } from './service/reference.service';
import { GradeService } from './service/grade.service';
import { CommentService } from './service/comment.service';
import { UsersService } from './service/users.service';
import { PepiteService } from './service/pepite.service';

import { EvaluatedGradePipe } from './pipes/evaluatedgrade.pipe'
import { FilterUserPipe } from './pipes/filteruser.pipe';
import { FilterUserTypePipe } from './pipes/filter-user-type.pipe';

import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PhaseComponent } from './pages/phase/phase.component';
import { LoginComponent } from './pages/login/login.component';
import { UsersComponent } from './pages/users/users.component';
import { PepiteHomeComponent } from './pages/pepite-home/pepite-home.component';
import { ActivateComponent } from './pages/activate/activate.component';
import { UserFormComponent } from './common/user-form/user-form.component';
import { AdminComponent } from './pages/admin/admin.component';

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
    ProfileComponent,
    EvaluatedGradePipe,
    PhaseComponent,
    CategoryComponent,
    CommentComponent,
    CommentlineComponent,
    GradeComponent,
    GlobalPhaseComponent,
    LoginComponent,
    UsersComponent,
    UserstatComponent,
    PepiteHomeComponent,
    UserlistComponent,
    FilterUserTypePipe,
    ActivateComponent,
    UserFormComponent,
    AdminComponent
  ],
  imports: [
    NguiAutoCompleteModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [{
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    AuthService,
    ReferenceService,
    GradeService,
    CommentService,
    UsersService,
    PepiteService,
    FilterUserPipe,
    AppConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
