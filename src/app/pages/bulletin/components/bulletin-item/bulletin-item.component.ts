import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Bulletin } from '../../../../shared/models/bulletin.model';
import { NgFor, NgIf } from '@angular/common';
import { BulletinService } from '../../../../shared/services/impl/bulletin.service';
import { PaginationComponent } from "../../../../shared/components/pagination/pagination.component";
import { Pagination } from '../../../../shared/models/pagination.model';

@Component({
  selector: 'app-bulletin-item',
  imports: [NgIf, NgFor, PaginationComponent],
  templateUrl: './bulletin-item.component.html',
  styleUrl: './bulletin-item.component.css'
})
export class BulletinItemComponent {
  @Input({required : true}) bulletins?: Bulletin[];
  @Input({required : true}) pagination?: Pagination;
  @Output() notif = new EventEmitter<string>();
  @Output() refresh = new EventEmitter<void>();
  @Output() onPageChange: EventEmitter<number> = new EventEmitter<number>();

  paginate(page: number) {
    this.onPageChange.emit(page);
  }

  constructor(private bulletinService : BulletinService) { }

  delete(idBulletin: number) {
    if (confirm('Are you sure you want to delete this bulletin?')) {
      this.bulletinService.delete(idBulletin).subscribe({
        next: (response) => {
          this.refresh.emit();
          this.notif.emit("Bulletin suprimé avec succès ✔");
        },
        error: (error) => {
          console.error('Error deleting bulletin:', error);
        }
      });
    } 
  }

  sendMail(idBulletin: number) {
    this.notif.emit("Bulletin en cours d'envoi...");
    this.bulletinService.sendMail(idBulletin).subscribe({
      next: (response) => {
        this.notif.emit("Bulletin envoyé avec succès ✔");
        this.refresh.emit();
      },
      error: (error) => {
        console.error('Error sending bulletin:', error);
      }
    });
  }
  download(bulletin: Bulletin) {
    this.notif.emit("Bulletin en cours de téléchargement...");
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
