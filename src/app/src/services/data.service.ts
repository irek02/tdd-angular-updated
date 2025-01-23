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

    return this.httpClient.get<Home[]>('assets/homes.json');

  }

  getHome$(id: number): Observable<Home> {

    return this.httpClient.get<Home>('assets/homes.json');

  }

  bookHome$() {

    return this.httpClient.post('http://www.mocky.io/v2/5d674012330000f9ae44a00e', {});

  }
}
