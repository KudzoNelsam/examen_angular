import { Component } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { RouterOutlet } from '@angular/router';
import { BottomNavComponent } from "./bottom-nav/bottom-nav.component";

@Component({
  selector: 'app-principal',
  imports: [RouterOutlet, SidebarComponent, TopbarComponent, BottomNavComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {

}
