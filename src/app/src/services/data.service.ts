import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Home } from '../components/homes/homes.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getHomes$(): Observable<Home[]> {

    return this.httpClient.get<Home[]>('http://localhost:3000/homes');

  }
}
