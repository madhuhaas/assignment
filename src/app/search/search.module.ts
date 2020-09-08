import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SearchFlightsComponent } from './search-flights.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: SearchFlightsComponent },
      { path: 'flightSearch', component: SearchFlightsComponent }
    ])
  ]
})
export class SearchModule { }
