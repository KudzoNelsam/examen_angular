import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notif',
  imports: [],
  templateUrl: './notif.component.html',
  styleUrl: './notif.component.css'
})
export class NotifComponent {
  @Input({required : true}) notifContent: string = '';
}
