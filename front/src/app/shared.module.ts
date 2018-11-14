import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	MatButtonModule, MatCheckboxModule, MatCardModule,
	MatIconModule, MatFormFieldModule, MatInputModule,
	MatToolbarModule, MatMenuModule, MatListModule,
	MatOptionModule, MatSelectModule, MatProgressSpinnerModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

const materialModules = [
	MatButtonModule, MatCheckboxModule, MatCardModule,
	MatIconModule, MatFormFieldModule, MatInputModule,
	MatToolbarModule, MatMenuModule, MatListModule,
	MatOptionModule, MatSelectModule, MatProgressSpinnerModule
];

@NgModule({
	imports: [
		CommonModule,
		...materialModules,
		FlexLayoutModule,
		ReactiveFormsModule
	],
	declarations: [],
	exports: [
		CommonModule,
		FormsModule,
		...materialModules,
		FlexLayoutModule,
		ReactiveFormsModule
	]
})
export class SharedModule { }
