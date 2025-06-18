import {Routes} from '@angular/router';
import {PrincipalComponent} from './shared/layouts/principal/principal.component';
import {PATHS} from './routing/app.paths';
import {ClientsComponent} from './pages/clients/clients.component';
import {ClientFormComponent} from './pages/clients/client-form/client-form.component';
import {DettesComponent} from './pages/dettes/dettes.component';
import {DetteFormComponent} from './pages/dettes/dette-form/dette-form.component';
import {ArticlesComponent} from './pages/articles/articles.component';
import {ArticleFormComponent} from './pages/articles/article-form/article-form.component';
import {PaiementsComponent} from './pages/paiements/paiements.component';

export const routes: Routes = [
  {
    path: '',
    component: PrincipalComponent,
    children: [
      {
        path: PATHS.CLIENT.LIST,
        component: ClientsComponent
      },
      {
        path: PATHS.CLIENT.ADD,
        component: ClientFormComponent
      },
      {
        path: PATHS.DETTE.LIST,
        component: DettesComponent
      },
      {
        path: PATHS.DETTE.ADD,
        component: DetteFormComponent
      },
      {
        path: PATHS.ARTICLE.LIST,
        component: ArticlesComponent
      },
      {
        path: PATHS.ARTICLE.ADD,
        component: ArticleFormComponent
      },
      {
        path: PATHS.PAIEMENT.BY_DETTE,
        component :PaiementsComponent
      }

    ]
  },
  {
    path: '',
    redirectTo: PATHS.CLIENT.LIST,
    pathMatch: 'full'
  }
];
