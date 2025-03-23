import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBookingComponent } from './home-booking.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('HomeBookingComponent', () => {
  let component: HomeBookingComponent;
  let fixture: ComponentFixture<HomeBookingComponent>;

  const el = (selector: string) => fixture.nativeElement.querySelector(selector);

  const mockHome = {
    id: '1',
    title: 'Home 1',
    image: 'assets/home.jpg',
    location: 'new york',
    price: '100'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeBookingComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockHome }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show title', () => {

    expect(el(`[data-test="title"]`).textContent).toContain('Home 1');

  });

  it('should show price', () => {

    expect(el(`[data-test="price"]`).textContent).toContain('100');

  });

  it('should show check in date field', () => {

    expect(el(`[data-test="check-in"]`)).toBeTruthy();

  });

  it('should show check out date field', () => {

    expect(el(`[data-test="check-out"]`)).toBeTruthy();

  });

  //
  //
  //
  //
  // show show total cost
  // should book home after clicking Book button
});
