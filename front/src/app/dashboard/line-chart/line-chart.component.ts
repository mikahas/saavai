import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'saa-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @Input() name: string;
  @Input() series: any[]; // TODO: type this

  view: any[];  // width, height
  colorScheme = {
    domain: ['#5AA454', '#A10A28']
  };
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

    this.balanceScales();

    this.yAxisLabel = this.name;
    this.data = [{
      name: this.name,
      series: this.series
    }];
  }

  balanceScales() {
    // add a padding of half the difference of min and max
    // to the extremes to even out the chart a bit
    if (this.yScaleMin !== undefined && this.yScaleMax !== undefined) {
      const difference = (this.yScaleMax - this.yScaleMin) * 0.5;
      this.yScaleMin = this.yScaleMin - difference;
      this.yScaleMax = this.yScaleMax + difference;
    }
  }

  dateTickFormatting(val) {
    // console.log('val', val);
    if (val instanceof Date) {
      var options = { month: 'long' };
      //return (<Date>val).toLocaleString('de-DE', options);
      return (<Date>val).toLocaleString('fi-FI', options);
    }
  }

  onSelect(event) {
    console.log('event', event);
  }

}
