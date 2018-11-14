import { Component, Input } from '@angular/core';

@Component({
  selector: 'saa-number-card',
  templateUrl: './number-card.component.html',
  styleUrls: ['./number-card.component.scss']
})
export class NumberCardComponent {

  cardColor: string = '#232837';

  @Input() data: any[];

  formatValue(value) {
    return value.value;
  }

}
