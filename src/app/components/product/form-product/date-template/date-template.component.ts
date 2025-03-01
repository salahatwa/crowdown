import { Component, Input } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-template',
  templateUrl: './date-template.component.html',
  styleUrl: './date-template.component.scss'
})
export class DateTemplateComponent {

  @Input() focused: string;
  @Input() date: NgbDate | null = null;
  @Input() fromDate: NgbDate | null;
  @Input() toDate: NgbDate | null;

  hoveredDate: NgbDate | null = null;


  isHovered(date: NgbDate, fromDate: NgbDate, toDate: NgbDate) {
    return (
      fromDate && !toDate && this.hoveredDate && date.after(fromDate) && date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate, fromDate: NgbDate, toDate: NgbDate) {
    return toDate && date.after(fromDate) && date.before(toDate);
  }

  isRange(date: NgbDate, fromDate: NgbDate, toDate: NgbDate) {
    return (
      date.equals(fromDate) ||
      (toDate && date.equals(toDate)) ||
      this.isInside(date, fromDate, toDate) ||
      this.isHovered(date, fromDate, toDate)
    );
  }

}
