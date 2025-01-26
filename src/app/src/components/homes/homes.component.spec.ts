import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomesComponent } from './homes.component';
import { provideHttpClient } from '@angular/common/http';
import { DataService, Home } from '../../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
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
    fixture.detectChanges();
  });

  it('should display homes', () => {
    const mockHomes: Home[] = [
      { id: '1', title: 'Home 1', image: 'image1.jpg', location: 'Location 1', price: '100' },
      { id: '2', title: 'Home 2', image: 'image2.jpg', location: 'Location 2', price: '200' }
    ];
    dataService.getHomes$.and.returnValue(of(mockHomes));

    component.ngOnInit();
    fixture.detectChanges();

    const homeElements = fixture.debugElement.queryAll(By.css('[data-test="home"]'));
    expect(homeElements.length).toBe(2);
    expect(homeElements[0].nativeElement.textContent).toContain('Home 1');
    expect(homeElements[1].nativeElement.textContent).toContain('Home 2');
  });

  it('should open dialog when Book Home button is clicked', () => {
    const mockHome: Home = { id: '1', title: 'Home 1', image: 'image1.jpg', location: 'Location 1', price: '100' };
    component.openDialog(mockHome);

    expect(dialog.open).toHaveBeenCalledWith(BookHomeComponent, {
      width: '500px',
      data: { home: mockHome }
    });
  });

  it('should display no homes when getHomes$ returns an empty array', () => {
    dataService.getHomes$.and.returnValue(of([]));

    component.ngOnInit();
    fixture.detectChanges();

    const homeElements = fixture.debugElement.queryAll(By.css('.home'));
    expect(homeElements.length).toBe(0);
  });

});
