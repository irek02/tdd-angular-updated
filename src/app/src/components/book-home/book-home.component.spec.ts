import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatFormField } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { BookHomeComponent } from './book-home.component';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { DataService, Home } from '../../services/data.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('BookHomeComponent', () => {
  let component: BookHomeComponent;
  let fixture: ComponentFixture<BookHomeComponent>;
  const dataService = jasmine.createSpyObj('DataService', ['bookHome$']);
  const snackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
  const dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
  const home: Home = {
    id: '1',
    title: 'Home 1',
    image: 'sample-image.jpg',
    location: 'Sample Location',
    price: '125'
  };

  const el = (selector: string) => fixture.nativeElement.querySelector(selector);

  beforeEach(async () => {


    await TestBed.configureTestingModule({
      imports: [
        BookHomeComponent,
        MatFormField,
        MatDatepickerModule,
        FormsModule,
        MatNativeDateModule,
        MatInputModule,
      ],
      providers: [
        provideAnimationsAsync(),
        { provide: DataService, useValue: dataService },
        { provide: MatSnackBar, useValue: snackBar },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { home } }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show title', () => {

    expect(el('[data-test="title"]').textContent)
      .toContain('Book Home 1');

  });

  it('should show price', () => {

    expect(el('[data-test="price"]').textContent)
      .toContain('$125 per night');

  });

  it('should show check in date field', () => {

    expect(el('[data-test="check-in"]'))
      .toBeTruthy();

  });

  it('should show check out date field', () => {

    expect(el('[data-test="check-out"]'))
      .toBeTruthy();

  });

  it('should show total', () => {

    // user enters check in date: 12/20/19
    const checkIn = el('[data-test="check-in"] input');
    checkIn.value = '12/20/19';
    checkIn.dispatchEvent(new Event('input'));

    // user enter check out date: 12/23/19
    const checkOut = el('[data-test="check-out"] input');
    checkOut.value = '12/23/19';
    checkOut.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    // assert that the total shows 3x125=375
    expect(el('[data-test="total"]').textContent)
      .toContain('Total: $375');

  });

  it('should show -- for total when dates are invalid', () => {

    const checkIn = el('[data-test="check-in"] input');
    checkIn.value = '';
    checkIn.dispatchEvent(new Event('input'));

    const checkOut = el('[data-test="check-out"] input');
    checkOut.value = '';
    checkOut.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(el('[data-test="total"]').textContent)
      .toContain('Total: --');

  });

  it('should book home after clicking the Book button', () => {

    dataService.bookHome$.and.returnValue(of({}));

    // user enters check in date: 12/20/19
    const checkIn = el('[data-test="check-in"] input');
    checkIn.value = '12/20/19';
    checkIn.dispatchEvent(new Event('input'));

    // user enter check out date: 12/23/19
    const checkOut = el('[data-test="check-out"] input');
    checkOut.value = '12/23/19';
    checkOut.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    // click the Book home button
    el('[data-test="book-btn"] button').click();

    // assert that the data service was used to book the home
    expect(dataService.bookHome$).toHaveBeenCalled();

  });

  it('should close the dialog and show notification after clicking Book button', fakeAsync(() => {

    dataService.bookHome$.and.returnValue(of(null));

    // user enters check in date: 12/20/19
    const checkIn = el('[data-test="check-in"] input');
    checkIn.value = '12/20/19';
    checkIn.dispatchEvent(new Event('input'));

    // user enter check out date: 12/23/19
    const checkOut = el('[data-test="check-out"] input');
    checkOut.value = '12/23/19';
    checkOut.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    // click the Book home button
    el('[data-test="book-btn"] button').click();

    tick();

    expect(dialogRef.close).toHaveBeenCalled();
    expect(snackBar.open).toHaveBeenCalled();

  }));

});
