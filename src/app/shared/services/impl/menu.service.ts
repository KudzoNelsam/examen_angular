import { Injectable } from '@angular/core';
import { IMenuService } from '../IMenuService';
import { ROUTES } from '../../../routing/app.paths';

@Injectable({
  providedIn: 'root'
})
export class MenuService implements IMenuService {
  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'ri-dashboard-3-line',
      routerLinkActive: 'selected',
      routerLink: ROUTES.DASHBOARD,
      isVisible: true
    },
    
    {
      label: 'Employés',
      icon: 'ri-group-line',
      routerLinkActive: 'selected',
      routerLink: ROUTES.EMPLOYE.LIST,
      isVisible: true
    },
    {
      label: 'Bulletins',
      icon: 'ri-newspaper-line',
      routerLinkActive: 'selected',
      routerLink: ROUTES.BULLETIN.LIST,
      isVisible: true
    }
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
