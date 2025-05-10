import { Routes } from '@angular/router';
import { PrincipalComponent } from './shared/layouts/principal/principal.component';
import { ListEmployeComponent } from './pages/employe/list-employe/list-employe.component';
import { PATHS } from './routing/app.paths';
import { EmployesIdComponent } from './pages/employes-id/employes-id.component';

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
                component: ListEmployeComponent
            },
            {
                path: PATHS.DASHBOARD,
                component: ListEmployeComponent
            },
            {
                path: PATHS.EMPLOYE.DETAIL,
                component: EmployesIdComponent
            },
        ]
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full' // Reload
    },
];
