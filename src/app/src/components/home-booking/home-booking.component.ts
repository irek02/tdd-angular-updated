import { Component, inject, OnInit } from '@angular/core';
import { Home } from '../homes/homes.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-home-booking',
  imports: [],
  templateUrl: './home-booking.component.html',
  styleUrl: './home-booking.component.css'
})
export class HomeBookingComponent implements OnInit {

  readonly home = inject<Home>(MAT_DIALOG_DATA);

  ngOnInit() {
    console.log(this.home);
  }

}
