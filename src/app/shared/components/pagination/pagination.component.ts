import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pagination } from '../../models/pagination.model';


@Component({
  selector: 'app-pagination',
  imports: [NgClass, NgIf],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {

  @Input({ required: true }) pagination?: Pagination;

  @Output() onPageChange: EventEmitter<number> = new EventEmitter<number>();
  onNextPage() {
    this.onPageChange.emit(this.pagination?.currentPage! + 1);
  }
  onPreviousPage() {
    this.onPageChange.emit(this.pagination?.currentPage! - 1);
  }

  onPaginate(page: number) {
    // this.refresh(page)
    this.onPageChange.emit(page);
  }
}
