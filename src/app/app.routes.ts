import { Routes } from '@angular/router';
import { PrincipalComponent } from './shared/layouts/principal/principal.component';
import { ListEmployeComponent } from './pages/employe/list-employe/list-employe.component';
import { PATHS } from './routing/app.paths';

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
        ]
    },
    {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full' // Reload
  },
];
