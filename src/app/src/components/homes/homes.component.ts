import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DataService } from '../../services/data.service';

export interface Home {
  id: string;
  title: string;
  image: string;
  location: string;
  price: string;
}

@Component({
  selector: 'app-homes',
  imports: [AsyncPipe],
  templateUrl: './homes.component.html',
  styleUrl: './homes.component.css'
})
export class HomesComponent implements OnInit {

  homes$: Observable<Home[]> = of([]);

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {

    this.homes$ = this.dataService.getHomes$();

  }

}
