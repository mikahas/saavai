import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule
  ]
})
export class SharedModule { }
