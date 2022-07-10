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
