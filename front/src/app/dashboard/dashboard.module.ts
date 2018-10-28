import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
