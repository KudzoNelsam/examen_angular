import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Bulletin } from '../../../../shared/models/bulletin.model';
import { NgFor, NgIf } from '@angular/common';
import { BulletinService } from '../../../../shared/services/impl/bulletin.service';

@Component({
  selector: 'app-bulletin-item',
  imports: [NgIf, NgFor],
  templateUrl: './bulletin-item.component.html',
  styleUrl: './bulletin-item.component.css'
})
export class BulletinItemComponent {
  @Input() bulletins?: Bulletin[];
  @Output() sendMailEvent = new EventEmitter<void>();

  constructor(private bulletinService : BulletinService) { }

  sendMail(idBulletin: number) {
    this.bulletinService.sendMail(idBulletin).subscribe({
      next: (response) => {
        this.sendMailEvent.emit();
      },
      error: (error) => {
        console.error('Error sending bulletin:', error);
      }
    });
  }
  download(bulletin: Bulletin) {
    this.bulletinService.download(bulletin.id).subscribe({
      next: (data) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bulletin-${bulletin.employeNom}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error fetching bulletin PDF:', error);
      }
    });
  }
}
