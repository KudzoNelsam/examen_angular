import { Routes } from '@angular/router';
import { PrincipalComponent } from './shared/layouts/principal/principal.component';
import { ListEmployeComponent } from './pages/employe/list-employe/list-employe.component';

export const routes: Routes = [
    {
        path: '',
        component: PrincipalComponent,
        children: [
            {
                path: 'employes',
                component: ListEmployeComponent
            }
        ]
    }
];
