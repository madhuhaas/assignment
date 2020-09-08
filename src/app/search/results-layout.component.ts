import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: 'results-layout',
  templateUrl: './results-layout.component.html',
  styleUrls: ['./results-layout.component.css']
})
export class ResultsLayoutComponent implements OnInit {
  @Input() results: [];
  @Input() multiple: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
