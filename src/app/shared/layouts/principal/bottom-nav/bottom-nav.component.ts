import { Component } from '@angular/core';
import { MenuItem, MenuService } from '../../../services/impl/menu.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bottom-nav',
  imports: [RouterModule],
  templateUrl: './bottom-nav.component.html',
  styleUrl: './bottom-nav.component.css'
})
export class BottomNavComponent {
  menuItems: MenuItem[] = [];
  
    constructor(private menuService: MenuService) {}
  
    ngOnInit(): void {
      this.menuItems = this.menuService.menuItems;
    }
}
