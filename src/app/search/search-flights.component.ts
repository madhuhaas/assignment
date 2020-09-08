
import { Component, OnInit } from "@angular/core";

import { SearchService } from "./search.service";
import { Flight } from "src/app/search/flight";

@Component({
  selector: "search-flights",
  templateUrl: "./search-flights.component.html",
  styleUrls: ['./search-flights.component.css'],
  providers: [SearchService]
})
export class SearchFlightsComponent implements OnInit {
  bookReturn = false;
  flights: Flight[] = [];
  originCities = [];
  destinationCities = [];
  errorMessage = '';

  constructor(private searchService: SearchService) {
  }

  ngOnInit(): void {
    this.searchService.getFlights().subscribe({
      next: flights => {
        this.flights = flights;
        this.originCities = flights.filter(
          (flight, i, arr) => arr.findIndex(t => t.origin === flight.origin) === i
        );
        this.originCities = this.originCities.map( flight => flight.origin );

        this.destinationCities = flights.filter(
          (flight, i, arr) => arr.findIndex(t => t.destination === flight.destination) === i
        );
        this.destinationCities = this.destinationCities.map( flight => flight.destination );
        //console.log("getting cities");
        //console.log(this.originCities);
        //console.log(this.destinationCities);
      },
      error: err => this.errorMessage = err
    }); 
  }

  tabClickEvent( returnClicked ) {
    this.bookReturn = returnClicked;       
  }

  onSearch(searchParams) {
    // console.log("In onSearch method");
    // console.log("Origin: " + searchParams.origin);
    // console.log("Destination: " + searchParams.destination);
    // console.log("Departure: " + searchParams.departureDate);
    // console.log("Return: " + searchParams.returnDate);
    // console.log("Passengers: " + searchParams.passengers);
    this.searchService.searchFlights(searchParams);
  }

}