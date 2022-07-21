/* http://146.185.211.116:8000/api/ */

export interface IAirport {
  id: number;
  name: string;
  ident: string;
  local_code: string;
  region: string;
  type: string;
  country: string;
}

export interface ServerResponse<T> {
  count: number;
  next: number | null;
  previous: number | null;
  results: T[];
}

export interface IHandbook {
  id: number;
  name: string;
  ident: string;
  local_code: string;
  region: string;
  type: string;
  country: string;
}

export type IAirportType = string;
export type IAirportRegion = string;
export type IAirportCountry = string;
