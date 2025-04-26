import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeBookingComponent } from './home-booking.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../../services/data.service';
import { of } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('HomeBookingComponent', () => {
  let component: HomeBookingComponent;
  let fixture: ComponentFixture<HomeBookingComponent>;
  let dataService: jasmine.SpyObj<DataService>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<HomeBookingComponent>>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  const el = (selector: string) => fixture.nativeElement.querySelector(selector);

  const mockHome = {
    id: '1',
    title: 'Home 1',
    image: 'assets/home.jpg',
    location: 'new york',
    price: '100'
  };

  beforeEach(async () => {

    dataService = jasmine.createSpyObj('DataService', ['bookHome']);
    dataService.bookHome.and.returnValue(of({}));
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    snackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [HomeBookingComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockHome },
        { provide: DataService, useValue: dataService },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MatSnackBar, useValue: snackBar },
        provideAnimationsAsync(),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show title', () => {

    expect(el(`[data-test="title"]`).textContent).toContain('Book Home 1');

  });

  it('should show price', () => {

    expect(el(`[data-test="price"]`).textContent).toContain('$100 per night');

  });

  it('should show check in date field', () => {

    expect(el(`[data-test="check-in"]`)).toBeTruthy();

  });

  it('should show check out date field', () => {

    expect(el(`[data-test="check-out"]`)).toBeTruthy();

  });

  it('show show total cost', () => {

    // user enters check in date: 12/20/25
    const checkIn = el(`[data-test="check-in"] input`);
    checkIn.value = '12/20/25';
    checkIn.dispatchEvent(new Event('input'));

    // user enters check out date: 12/23/25
    const checkOut = el(`[data-test="check-out"] input`);
    checkOut.value = '12/23/25';
    checkOut.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    // asset that the total shows 125x3 = 375
    expect(el(`[data-test="total"]`).textContent).toContain('Total: $300');

  });

  it('should book home after clicking Book button', () => {

    // user enters check in date: 12/20/25
    const checkIn = el(`[data-test="check-in"] input`);
    checkIn.value = '12/20/25';
    checkIn.dispatchEvent(new Event('input'));

    // user enters check out date: 12/23/25
    const checkOut = el(`[data-test="check-out"] input`);
    checkOut.value = '12/23/25';
    checkOut.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    // click on Book button
    el('[data-test="book-btn"] button').click();
    // assert that the data service was used to send the booking request
    expect(dataService.bookHome).toHaveBeenCalled();

  });

  it('should close dialog and show notification after booking home', () => {

    const checkIn = el(`[data-test="check-in"] input`);
    checkIn.value = '12/20/25';
    checkIn.dispatchEvent(new Event('input'));

    const checkOut = el(`[data-test="check-out"] input`);
    checkOut.value = '12/23/25';
    checkOut.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    el('[data-test="book-btn"] button').click();

    expect(dialogRef.close).toHaveBeenCalled();
    expect(snackBar.open).toHaveBeenCalled();

  });

  it('should show -- when the dates are invalid', () => {

    // user enters check in date: 12/20/25
    const checkIn = el(`[data-test="check-in"] input`);
    checkIn.value = '12/23/25';
    checkIn.dispatchEvent(new Event('input'));

    // user enters check out date: 12/23/25
    const checkOut = el(`[data-test="check-out"] input`);
    checkOut.value = '12/20/25';
    checkOut.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(el(`[data-test="total"]`).textContent).toContain('Total: --');

  });

});
