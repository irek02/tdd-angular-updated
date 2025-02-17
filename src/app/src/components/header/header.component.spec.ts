import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show top part', () => {

    expect(fixture.nativeElement.querySelector('[data-test="logo"')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-test="search"')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-test="menu"')).toBeTruthy();

  });

  it('should show bottom part', () => {

    expect(fixture.nativeElement.querySelector('[data-test="home-type"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-test="dates"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-test="guests"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-test="price"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-test="rooms"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-test="amenities"]')).toBeTruthy();

  });

});
