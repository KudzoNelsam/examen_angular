import { Injectable } from '@angular/core';
import { IMenuService } from '../IMenuService';
import { ROUTES } from '../../../routing/app.paths';

@Injectable({
  providedIn: 'root'
})
export class MenuService implements IMenuService {
  menuItems: MenuItem[] = [
    {
      label: 'Clients',
      icon: 'ri-group-line',
      routerLinkActive: 'selected',
      routerLink: ROUTES.CLIENT.LIST,
      isVisible: true
    },
    {
      label: 'Dettes',
      icon: 'ri-article-line',
      routerLinkActive: 'selected',
      routerLink: ROUTES.DETTE.LIST,
      isVisible: true
    },
    {
      label: 'Articles',
      icon: 'ri-article-line',
      routerLinkActive: 'selected',
      routerLink: ROUTES.ARTICLE.LIST,
      isVisible: true
    },
  ];

  constructor() { }
}

export interface MenuItem {
  label: string;
  icon: string;
  routerLinkActive: string;
  routerLink: string;
  subItems?: MenuItem[];
  isVisible: boolean;
}
