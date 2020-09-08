/* Defines the search details entity */
export interface SearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  passengers: number;
  bookReturn: boolean;
}