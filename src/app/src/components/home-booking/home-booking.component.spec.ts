import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBookingComponent } from './home-booking.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('HomeBookingComponent', () => {
  let component: HomeBookingComponent;
  let fixture: ComponentFixture<HomeBookingComponent>;

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

    expect(fixture.nativeElement.querySelector('[data-test="title"').textContent).toContain('Home 1');

  });

  //
  // shold show price
  // should show check in date field
  // should show check out date field
  // show show total cost
  // should book home after clicking Book button
});
