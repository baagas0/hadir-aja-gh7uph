import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponent } from './explore-container/explore-container.component';
import { InputFileComponent } from './input-file/input-file.component';
import { TopHeaderComponent } from './top-header/top-header.component';
import { InputSelectComponent } from './input-select/input-select.component';
// import { IonicSelectableModule } from 'ionic-selectable';
import { InputDateComponent } from './input-date/input-date.component';
import { CalendarModule } from 'ion2-calendar';
import { InputDateRangeComponent } from './input-date-range/input-date-range.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // IonicSelectableModule
    ReactiveFormsModule,
    CalendarModule.forRoot({
      doneLabel: 'Save',
      closeIcon: true,
    }),
  ],
  declarations: [
    ExploreContainerComponent,
    InputFileComponent,
    TopHeaderComponent,
    InputSelectComponent,
    InputDateComponent,
    InputDateRangeComponent,
  ],
  exports: [
    ExploreContainerComponent,
    InputFileComponent,
    TopHeaderComponent,
    InputSelectComponent,
    InputDateComponent,
    InputDateRangeComponent,
  ],
})
export class CustomComponentModule {}
