import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-pagination',
  imports: [NgClass],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  currentPage: any;
  onNextPage() {
    throw new Error('Method not implemented.');
  }
  onPreviousPage() {
    throw new Error('Method not implemented.');
  }
  @Input({ required: true }) pages: number[] = [];
  @Output() onPageChange: EventEmitter<number> = new EventEmitter<number>();

  onPaginate(page: number) {
    // this.refresh(page)
    this.onPageChange.emit(page);
  }
}
