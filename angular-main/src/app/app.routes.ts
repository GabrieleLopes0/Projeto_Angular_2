import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ConsultantListComponent } from './components/consultant-list/consultant-list.component';
import { ConsultantFormComponent } from './components/consultant-form/consultant-form.component';
import { AboutComponent } from './components/about/about.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'consultants', 
    component: ConsultantListComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'consultant/new', 
    component: ConsultantFormComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' }
  },
  { 
    path: 'consultant/edit/:id', 
    component: ConsultantFormComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' }
  },
  { 
    path: 'about', 
    component: AboutComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/login' }
];
