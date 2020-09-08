import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchModule } from "./search/search.module";
import { SearchFlightsComponent } from "./search/search-flights.component";
import { SearchFlightsFormComponent } from "./search/search-flights-form.component";
import { SearchResultsComponent } from './search/search-results.component';
import { ResultsLayoutComponent } from './search/results-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchFlightsComponent,
    SearchFlightsFormComponent,
    SearchResultsComponent,
    ResultsLayoutComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SearchModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
