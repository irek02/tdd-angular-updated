import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Home {
  id: string;
  title: string;
  image: string;
  location: string;
  price: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getHomes$(): Observable<Home[]> {

    return this.httpClient.get<Home[]>('http://localhost:3000/homes');

  }

  bookHome$() {

    return this.httpClient.post('http://localhost:3000/bookings', {});

  }
}
