import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LineChartComponent } from './line-chart/line-chart.component';
import { NumberCardComponent } from './number-card/number-card.component';

@NgModule({
  imports: [
    SharedModule,
    NgxChartsModule
  ],
  declarations: [DashboardComponent, LineChartComponent, NumberCardComponent]
})
export class DashboardModule { }
