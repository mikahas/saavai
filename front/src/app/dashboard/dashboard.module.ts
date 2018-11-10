import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LineChartComponent } from './line-chart/line-chart.component';

@NgModule({
  imports: [
    SharedModule,
    NgxChartsModule
  ],
  declarations: [DashboardComponent, LineChartComponent]
})
export class DashboardModule { }
