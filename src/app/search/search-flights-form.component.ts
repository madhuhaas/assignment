import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl
} from "@angular/forms";

@Component({
  selector: 'search-flights-form',
  templateUrl: './search-flights-form.component.html',
  styleUrls: ['./search-flights-form.component.css']
})
export class SearchFlightsFormComponent implements OnInit {
  
  @Input() bookReturn: boolean;
  @Output() searchClicked = new EventEmitter();
  searchForm: FormGroup;

  origin = new FormControl("", Validators.required);
  destination = new FormControl("", Validators.required);
  departureDate = new FormControl("", Validators.required);
  returnDate = new FormControl("");
  passengers = new FormControl("", Validators.required);

  // origin = new FormControl("Pune (PNQ)", Validators.required);
  // destination = new FormControl("Mumbai (BOM)", Validators.required);
  // departureDate = new FormControl("2020-11-01", Validators.required);
  // returnDate = new FormControl("2020-11-02");
  // passengers = new FormControl("3", Validators.required);

  constructor(searchFb: FormBuilder) { 
    this.searchForm = searchFb.group({
      "origin": this.origin,
      "destination": this.destination,
      "departureDate": this.departureDate,
      "returnDate": this.returnDate,
      "passengers": this.passengers
    });
  }

  ngOnInit(): void {
  } 

  searchFlights() {
    // console.log("Search clicked!!");
    // console.log("Origin: " + this.origin.value);
    // console.log("Destination: " + this.destination.value);
    // console.log("Departure: " + this.departureDate.value);
    // console.log("Return: " + this.returnDate.value);
    // console.log("Passengers: " + this.passengers.value);
    var searchParams = {
      "origin": this.origin.value,
      "destination": this.destination.value,
      "departureDate": this.departureDate.value.replaceAll('-','/'),
      "returnDate": this.returnDate.value.replaceAll('-','/'),
      "passengers": this.passengers.value,
      "bookReturn": this.bookReturn
    };
    this.searchClicked.emit(searchParams);
  }

}
