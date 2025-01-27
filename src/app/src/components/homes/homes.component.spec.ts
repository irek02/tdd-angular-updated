import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomesComponent } from './homes.component';
import { provideHttpClient } from '@angular/common/http';
import { DataService, Home } from '../../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { BookHomeComponent } from '../book-home/book-home.component';

describe('HomesComponent', () => {
  let component: HomesComponent;
  let fixture: ComponentFixture<HomesComponent>;
  let dataService: jasmine.SpyObj<DataService>;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {

    const dataServiceSpy = jasmine.createSpyObj('DataService', ['getHomes$']);
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [HomesComponent],
      providers: [
        provideHttpClient(),
        { provide: DataService, useValue: dataServiceSpy },
        { provide: MatDialog, useValue: dialogSpy }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomesComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;

  });

  it('should display homes', () => {

    const mockHomes: Home[] = [
      { id: '1', title: 'Home 1', image: 'image1.jpg', location: 'Location 1', price: '100' },
      { id: '2', title: 'Home 2', image: 'image2.jpg', location: 'Location 2', price: '200' }
    ];
    dataService.getHomes$.and.returnValue(of(mockHomes));

    fixture.detectChanges();

    const homeElements = fixture.nativeElement.querySelectorAll('[data-test="home"]');
    expect(homeElements.length).toBe(2);

  });

  it('should show home info', () => {

    const mockHomes: Home[] = [
      { id: '1', title: 'Home 1', image: 'image1.jpg', location: 'Location 1', price: '100' },
    ];
    dataService.getHomes$.and.returnValue(of(mockHomes));

    fixture.detectChanges();

    const home = fixture.nativeElement.querySelector('[data-test="home"]');

    expect(home.querySelector('[data-test="image"]')).toBeTruthy();
    expect(home.querySelector('[data-test="title"]').innerText).toEqual('Home 1');
    expect(home.querySelector('[data-test="location"]').innerText).toEqual('Location 1');

  });

  it('should show Book button', () => {

    const mockHomes: Home[] = [
      { id: '1', title: 'Home 1', image: 'image1.jpg', location: 'Location 1', price: '100' },
    ];
    dataService.getHomes$.and.returnValue(of(mockHomes));
    fixture.detectChanges();

    const home = fixture.nativeElement.querySelector('[data-test="home"]');

    expect(home.querySelector('[data-test="book-btn"]')).toBeTruthy();

  });

  it('should use dialog service to open a dialog when clicking on Book button', () => {

    const mockHomes: Home[] = [
      { id: '1', title: 'Home 1', image: 'image1.jpg', location: 'Location 1', price: '100' },
    ];
    dataService.getHomes$.and.returnValue(of(mockHomes));
    fixture.detectChanges();

    // grab the button to click
    const bookBtn = fixture.nativeElement.querySelector('[data-test="book-btn"] button');
    // click the button
    bookBtn.click();
    // assert that the dialog service was used to open a dialog
    expect(dialog.open).toHaveBeenCalledWith(BookHomeComponent, {
      width: '500px',
      data: { home: mockHomes[0] }
    });

  });

});
