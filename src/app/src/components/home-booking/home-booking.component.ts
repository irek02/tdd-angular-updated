import { Component, inject, OnInit } from '@angular/core';
import { Home } from '../homes/homes.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-booking',
  imports: [
    FormsModule,
  ],
  templateUrl: './home-booking.component.html',
  styleUrl: './home-booking.component.css'
})
export class HomeBookingComponent implements OnInit {

  checkIn: string = '';
  checkOut: string = '';

  readonly home = inject<Home>(MAT_DIALOG_DATA);

  ngOnInit() {
    // console.log(this.home);
  }

  calculateTotal() {

    console.log(this.checkIn, this.checkOut)
    // calculate the number of nights between check in and check out dates
    const start: any = new Date(this.checkIn);
    const end: any = new Date(this.checkOut);
    const diffInMs = end - start;
    const nights = diffInMs / (1000 * 60 * 60 * 24);
    console.log(nights);

    // multiply the number of nights by the price of the home
    return nights * parseInt(this.home.price, 10);

  }

}
