import { Component } from '@angular/core';
import { DataService, Home } from '../../services/data.service';
import { AsyncPipe } from '@angular/common';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { BookHomeComponent } from '../book-home/book-home.component';

@Component({
  selector: 'app-homes',
  imports: [AsyncPipe],
  templateUrl: './homes.component.html',
  styleUrl: './homes.component.css'
})
export class HomesComponent {

  homes$: Observable<Home[]> = of([]);

  constructor(
    private dataService: DataService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.homes$ = this.dataService.getHomes$();
  }

  openDialog(home: Home) {
    this.dialog.open(BookHomeComponent, {
      width: '500px',
      data: { home }
    });
  }

}
