import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomesComponent } from './homes.component';
import { DataService } from '../../services/data.service';
import { of } from 'rxjs';

describe('HomesComponent', () => {
  let component: HomesComponent;
  let fixture: ComponentFixture<HomesComponent>;
  let dataService: jasmine.SpyObj<DataService>;

  beforeEach(async () => {

    dataService = jasmine.createSpyObj('DataService', ['getHomes$']);

    await TestBed.configureTestingModule({
      imports: [HomesComponent],
      providers: [
        { provide: DataService, useValue: dataService }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomesComponent);
    component = fixture.componentInstance;
  });

  it('should show homes', () => {

    const mockHomes = [
      {
        id: '1',
        title: 'Home 1',
        image: 'assets/home.jpg',
        location: 'new york',
        price: '100'
      },
      {
        id: '2',
        title: 'Home 2',
        image: 'assets/home.jpg',
        location: 'boston',
        price: '200'
      },
      {
        id: '3',
        title: 'Home 3',
        image: 'assets/home.jpg',
        location: 'chicago',
        price: '300'
      }
    ];
    dataService.getHomes$.and.returnValue(of(mockHomes));

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('[data-test="home"]').length).toBe(3);

  });

  it('should show home info', () => {

    const mockHomes = [
      {
        id: '1',
        title: 'Home 1',
        image: 'assets/home.jpg',
        location: 'new york',
        price: '100'
      },
      {
        id: '2',
        title: 'Home 2',
        image: 'assets/home.jpg',
        location: 'boston',
        price: '200'
      },
      {
        id: '3',
        title: 'Home 3',
        image: 'assets/home.jpg',
        location: 'chicago',
        price: '300'
      }
    ];
    dataService.getHomes$.and.returnValue(of(mockHomes));

    fixture.detectChanges();

    const home = fixture.nativeElement.querySelector('[data-test="home"]');

    expect(home.querySelector('[data-test="title"]').innerText).toEqual('Home 1');
    expect(home.querySelector('[data-test="location"]').innerText).toEqual('new york');
    expect(home.querySelector('[data-test="image"]')).toBeTruthy();

  });

});
