import { Routes } from '@angular/router';
import { PrincipalComponent } from './shared/layouts/principal/principal.component';
import { ListEmployeComponent } from './pages/employe/list-employe/list-employe.component';
import { PATHS } from './routing/app.paths';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeDetailsComponent } from './pages/employe/employe-details/employe-details.component';
import { ListBulletinComponent } from './pages/bulletin/list-bulletin/list-bulletin.component';
import { AddEmployeComponent } from './pages/employe/add-employe/add-employe.component';
import { DepartementComponent } from './pages/dashboard/departement/departement.component';

export const routes: Routes = [
    {
        path: '',
        component: PrincipalComponent,
        children: [
            {
                path: PATHS.EMPLOYE.LIST,
                component: ListEmployeComponent
            },
            {
                path: PATHS.EMPLOYE.ADD,
                component: AddEmployeComponent
            },
            {
                path: PATHS.DASHBOARD,
                component: DashboardComponent
            },
            {
                path: PATHS.EMPLOYE.DETAIL,
                component: EmployeDetailsComponent
            },
            {
                path: PATHS.BULLETIN.LIST,
                component: ListBulletinComponent
            },
            {
                path: PATHS.DEPARTEMENT.LIST,
                component: DepartementComponent,
            },
            {
                path: '',
                redirectTo: '/home',
                pathMatch: 'full' // Reload
            },
        ]
    },
];
