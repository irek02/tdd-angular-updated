import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormField } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { BookHomeComponent } from './book-home.component';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { DataService } from '../../services/data.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

describe('BookHomeComponent', () => {
  let component: BookHomeComponent;
  let fixture: ComponentFixture<BookHomeComponent>;
  let mockDataService: any;
  let mockSnackBar: any;
  let mockDialogRef: any;

  beforeEach(async () => {

    mockDataService = {
      bookHome$: jasmine.createSpy('bookHome$').and.returnValue(of({}))
    };
    mockSnackBar = {
      open: jasmine.createSpy('open')
    };
    mockDialogRef = {
      close: jasmine.createSpy('close')
    };

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
        { provide: DataService, useValue: mockDataService },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { home: { price: '100' } } }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should calculate total correctly', () => {
    const total = component.calculateTotal('10-10-23', '10-12-23');
    expect(total).toBe('$200');
  });

  it('should return -- for invalid total', () => {
    const total = component.calculateTotal('10-10-23', '10-10-23');
    expect(total).toBe('--');
  });

  it('should book home and show snackbar', async () => {
    const event = new Event('submit');
    await component.bookHome(event);
    expect(mockDataService.bookHome$).toHaveBeenCalled();
    expect(mockDialogRef.close).toHaveBeenCalled();
    expect(mockSnackBar.open).toHaveBeenCalledWith('Home booked!', '', { duration: 5000 });
  });
});
