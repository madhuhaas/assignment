import { Component, OnInit, Input , OnDestroy} from "@angular/core";

import { SearchParams } from './search-params';
import { SearchService } from './search.service';
import { Subscription } from "rxjs";
import { Flight } from "src/app/search/flight";

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnDestroy, OnInit {

  subscription: Subscription;
  searchParams: SearchParams;
  flights: Flight[] = [];
  resultsOnward: Flight[] = [];
  resultsReturn: Flight[] = [];
  multiFlightsOnward: [];
  multiFlightsReturn: [];
  errorMessage = '';
  
  constructor(private searchService: SearchService) {
    this.subscription = searchService.searchedFlights$.subscribe(
      searchParams => {
        this.searchParams = searchParams;
        // console.log("in search results");
        // console.log("Origin: " + this.searchParams.origin);

        this.resultsOnward = this.flights.filter( 
          flight => flight.origin === searchParams.origin && flight.destination === searchParams.destination 
                      && flight.date === searchParams.departureDate);
        
        let flightsAvbl = this.flights;
        var multiFlightsOnward = [];
        let origin = searchParams.origin;
        let destination = searchParams.destination;
        let date = searchParams.departureDate;
        let tempArrival: number;
        let tempOrigin: string;
        for(let i = 0; i<flightsAvbl.length; i++) {
          if(flightsAvbl[i].origin !== origin || flightsAvbl[i].date !== date) continue;
          tempOrigin = flightsAvbl[i].destination;
          tempArrival = parseInt(flightsAvbl[i].arrivalTime.split(":")[0])*60 + parseInt(flightsAvbl[i].arrivalTime.split(":")[1]);
          for(let j = 0; j<flightsAvbl.length; j++) {
            if(i == j || tempOrigin !== flightsAvbl[j].origin || flightsAvbl[j].date !== date) continue;
            if(tempOrigin === flightsAvbl[j].origin && destination === flightsAvbl[j].destination) {
              let tempDeparture = parseInt(flightsAvbl[j].departureTime.split(":")[0])*60 + parseInt(flightsAvbl[i].departureTime.split(":")[1]);
              if(tempDeparture - tempArrival > 30) {
                let combination = [flightsAvbl[i], flightsAvbl[j]];
                multiFlightsOnward.push(combination);
              }
            }
          }
        }

        console.log("Multiple Flights Onward");
        console.log(multiFlightsOnward);

        // calculate total price and durations of all available flights
        this.resultsOnward.forEach( function(flight) {
          flight.price = flight.price*searchParams.passengers;
          let departureTime = flight.departureTime;
          let arrivalTime = flight.arrivalTime;
          let arrivalInMins = parseInt(arrivalTime.split(":")[0])*60 + parseInt(arrivalTime.split(":")[1]);
          let departureInMins = parseInt(departureTime.split(":")[0])*60 + parseInt(departureTime.split(":")[1]);
          flight.duration = Math.floor((arrivalInMins-departureInMins)/60) + "h " + Math.floor((arrivalInMins-departureInMins)%60) +"m";
        });
        //console.log(this.resultsOnward);

        if(searchParams.bookReturn) {
          this.resultsReturn = this.flights.filter( 
          flight => flight.origin === searchParams.destination && flight.destination === searchParams.origin 
                      && flight.date === searchParams.returnDate);
          
          // Get Multiple Flights for Return

          var multiFlightsReturn = [];
          let origin = searchParams.destination;
          let destination = searchParams.origin;
          let date = searchParams.returnDate;
          for(let i = 0; i<flightsAvbl.length; i++) {
            if(flightsAvbl[i].origin !== origin || flightsAvbl[i].date !== date) continue;
            tempOrigin = flightsAvbl[i].destination;
            tempArrival = parseInt(flightsAvbl[i].arrivalTime.split(":")[0])*60 + parseInt(flightsAvbl[i].arrivalTime.split(":")[1]);
            for(let j = 0; j<flightsAvbl.length; j++) {
              if(i == j || tempOrigin !== flightsAvbl[j].origin || flightsAvbl[j].date !== date) continue;
              if(tempOrigin === flightsAvbl[j].origin && destination === flightsAvbl[j].destination) {
                let tempDeparture = parseInt(flightsAvbl[j].departureTime.split(":")[0])*60 + parseInt(flightsAvbl[i].departureTime.split(":")[1]);
                if(tempDeparture - tempArrival > 30) {
                  let combination = [flightsAvbl[i], flightsAvbl[j]];
                  multiFlightsReturn.push(combination);
                }
              }
            }
          }

        console.log("Multiple Flights Return");
        console.log(multiFlightsReturn);
          
          this.resultsReturn.forEach( function(flight) {
            flight.price = flight.price*searchParams.passengers;
            let departureTime = flight.departureTime;
            let arrivalTime = flight.arrivalTime;
            let arrivalInMins = parseInt(arrivalTime.split(":")[0])*60 + parseInt(arrivalTime.split(":")[1]);
            let departureInMins = parseInt(departureTime.split(":")[0])*60 + parseInt(departureTime.split(":")[1]);
            flight.duration = Math.floor((arrivalInMins-departureInMins)/60) + "h " + Math.floor((arrivalInMins-departureInMins)%60) +"m";
          });
          //console.log(this.resultsReturn);
        }
      }
    );
  }

  ngOnInit(): void {
    this.searchService.getFlights().subscribe({
      next: flights => {
        this.flights = flights;
        console.log(flights[0]);
      },
      error: err => this.errorMessage = err
    }); 
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
