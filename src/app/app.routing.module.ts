import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PhaseComponent } from './pages/phase/phase.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
          { path: 'home', component: HomeComponent },
          { path: 'profile', component: ProfileComponent },
          { path: 'phase/:id', component: PhaseComponent },
          { path: '', redirectTo: '/home', pathMatch:  'full'}
        ]),
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
