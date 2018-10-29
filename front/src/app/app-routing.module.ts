import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';

@NgModule({
  imports: [RouterModule.forRoot(
    appRoutes,
    { enableTracing: false } // set true to debug
  )],
  exports: [RouterModule]
})
export class AppRoutingModule {}
