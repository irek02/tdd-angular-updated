import { Component, inject, OnInit } from '@angular/core';
import { Home } from '../homes/homes.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-home-booking',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './home-booking.component.html',
  styleUrl: './home-booking.component.css'
})
export class HomeBookingComponent implements OnInit {

  checkIn: string = '';
  checkOut: string = '';

  readonly home = inject<Home>(MAT_DIALOG_DATA);

  constructor(
    private dataService: DataService,
    private dialogRef: MatDialogRef<HomeBookingComponent>,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    // console.log(this.home);
  }

  calculateTotal() {

    // calculate the number of nights between check in and check out dates
    const start: any = new Date(this.checkIn);
    const end: any = new Date(this.checkOut);
    const diffInMs = end - start;
    const nights = diffInMs / (1000 * 60 * 60 * 24);

    const res = nights * parseInt(this.home.price, 10);

    if (isNaN(res) || res < 0) {
      return '--';
    } else {
      return '$' + res;
    }

    // multiply the number of nights by the price of the home
    return nights * parseInt(this.home.price, 10);

  }

  bookHome() {

    this.dataService.bookHome(this.home).subscribe(() => {
      this.dialogRef.close();
      this.snackBar.open('Home booked successfully', 'OK', {
        duration: 2000,
      });
    });

  }

}
