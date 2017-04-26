import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PhaseComponent } from './pages/phase/phase.component';
import { LoginComponent } from './pages/login/login.component';
import { UsersComponent } from './pages/users/users.component';
import { PepiteHomeComponent } from './pages/pepite-home/pepite-home.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
          { path: 'login', component: LoginComponent},
          { path: 'home', component: HomeComponent },
          { path: 'user/:id', component: HomeComponent },
          { path: 'profile', component: ProfileComponent },
          { path: 'phase/:id', component: PhaseComponent },
          { path: 'users', component: UsersComponent },
          { path: 'users/:id', component: UsersComponent },
          { path: 'pepite/:id', component: PepiteHomeComponent},
          { path: '', redirectTo: '/login', pathMatch:  'full'}
        ]),
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
