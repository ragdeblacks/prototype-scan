import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-search',
  templateUrl: './list-search.component.html',
  styleUrls: ['./list-search.component.scss'],
})
export class ListSearchComponent {
  @Input() list = [];
  @Input() searchElement = '';
  @Output() detailConsult = new EventEmitter<any>();
  detailConsultation(invoice: string) {
    this.detailConsult.emit({invoice});
  }

}
