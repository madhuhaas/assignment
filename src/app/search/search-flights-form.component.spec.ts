import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFlightsFormComponent } from './search-flights-form.component';

describe('SearchFlightsFormComponent', () => {
  let component: SearchFlightsFormComponent;
  let fixture: ComponentFixture<SearchFlightsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFlightsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFlightsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
