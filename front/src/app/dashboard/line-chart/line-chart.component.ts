import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { find } from 'lodash';
import { colorSets } from '@swimlane/ngx-charts/release/utils';

@Component({
  selector: 'saa-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @Input() name: string;
  @Input() series: any[]; // TODO: type this

  view: any[];  // width, height
  colorScheme: any;
  gradient: boolean = false;
  
  showXAxis = true;
  showYAxis = true;

  showLegend = true;

  showXAxisLabel = true;
  showYAxisLabel = true;

  xAxisLabel = 'Date / time';
  yAxisLabel = '';

  autoScale: boolean = true;
  timeline: boolean = false;

  data: any[];  // TODO: type this

  @Input() yScaleMin: number = null;
  @Input() yScaleMax: number = null;

  constructor() { }

  ngOnInit() {

    this.colorScheme = this.getColorSet('air'); // air, aqua

    this.balanceScales();

    this.yAxisLabel = this.name;
    this.data = [{
      name: this.name,
      series: this.series
    }];
  }

  getColorSet(name: string) {
    return find(colorSets, set => set.name === name);
  }

  balanceScales() {
    // add a padding of half the difference of min and max
    // to the extremes to even out the chart a bit
    if (this.yScaleMin !== undefined && this.yScaleMax !== undefined) {
      const difference = (this.yScaleMax - this.yScaleMin); // * 0.25;
      this.yScaleMin = Math.round((this.yScaleMin - difference) * 10) / 10;
      this.yScaleMax = Math.round((this.yScaleMax + difference) * 10) / 10;
    }
  }

  dateTickFormatting(val) {
    // TODO: select range, default: day
    const time = moment(val).format("HH:mm");
    return time;
  }

  valueTickFormatting(val) {
    return val;
  }

  onSelect(event) {
    console.log('event', event);
  }

}
