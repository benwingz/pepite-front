import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PhaseComponent } from './pages/phase/phase.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
          { path: 'home', component: HomeComponent },
          { path: 'phase/:id', component: PhaseComponent },
          { path: '', redirectTo: '/home', pathMatch:  'full'}
        ]),
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
