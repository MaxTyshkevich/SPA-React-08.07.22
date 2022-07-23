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
export interface IAirportDetail {
  ident: string;
  local_code: string;
  name: string;
  coordinates: string;
  elevation_ft: string;
  gps_code: string;
  iata_code: string;
  continent: string;
  type: string;
  country: string;
  region: string;
  municipality: string;
}

export type IAirportType = string;
export type IAirportRegion = string;
export type IAirportCountry = string;
