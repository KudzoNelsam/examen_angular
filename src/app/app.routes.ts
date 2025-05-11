import { Routes } from '@angular/router';
import { PrincipalComponent } from './shared/layouts/principal/principal.component';
import { ListEmployeComponent } from './pages/employe/list-employe/list-employe.component';
import { PATHS } from './routing/app.paths';
import { EmployesIdComponent } from './pages/employes-id/employes-id.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BulletinDePaieComponent } from './pages/bulletin-de-paie/bulletin-de-paie.component';

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
                path: PATHS.DASHBOARD,
                component: DashboardComponent
            },
            {
                path: PATHS.EMPLOYE.DETAIL,
                component: EmployesIdComponent
            },
            {
                path: PATHS.BULLETIN.LIST,
                component: BulletinDePaieComponent
            },
        ]
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full' // Reload
    },
];
