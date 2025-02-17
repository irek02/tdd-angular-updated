import { of } from 'rxjs';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';

describe('DataService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: DataService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new DataService(httpClientSpy);
  });

  it('should get homes', () => {

    const mockHome = {
      id: '1',
      title: 'Home 1',
      image: 'image1.jpg',
      location: 'Location 1',
      price: '100',
    };
    httpClientSpy.get.and.returnValue(of([mockHome]));

    const spy = jasmine.createSpy('spy');
    service.getHomes$().subscribe(spy);

    expect(spy).toHaveBeenCalledWith([mockHome]);
    expect(httpClientSpy.get).toHaveBeenCalledWith('http://localhost:3000/homes');

  });

  it('should book home', () => {

    service.bookHome$();

    expect(httpClientSpy.post).toHaveBeenCalledWith('http://localhost:3000/bookings', {});

  });

});
