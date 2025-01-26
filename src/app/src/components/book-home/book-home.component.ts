import { Component, Inject } from '@angular/core';
import { DataService, Home } from '../../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormField } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import dayjs from 'dayjs';
import { FormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-book-home',
  imports: [
    MatFormField,
    MatDatepickerModule,
    FormsModule,
    MatNativeDateModule,
    MatInputModule
  ],
  templateUrl: './book-home.component.html',
  styleUrl: './book-home.component.css'
})
export class BookHomeComponent {

  checkIn: any;
  checkOut: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { home: Home },
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<BookHomeComponent>,
  ) { }

  async ngOnInit() {
  }

  calculateTotal(checkIn: any, checkOut: any) {

    const checkInDate = dayjs(checkIn, 'MM-DD-YY');
    const checkOutDate = dayjs(checkOut, 'MM-DD-YY');
    const nights = checkOutDate.diff(checkInDate, 'days');

    const total = nights * parseInt(this.data.home.price);

    if (total > 0 && total < 900000) {
      return '$' + total;
    } else {
      return '--';
    }

  }

  async bookHome(event: Event) {
    event.preventDefault();

    await lastValueFrom(this.dataService.bookHome$());

    this.dialogRef.close();
    this.snackBar.open('Home booked!', '', {
      duration: 5000,
    });

  }

}
