import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('DataService', () => {
  let service: DataService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({});
    service = new DataService(httpClientSpy);
  });

  it('should get homes', () => {

    // Mock http client
    const mockHomes = [{
      id: '1',
      title: 'Home 1',
      image: 'image1.jpg',
      location: 'Location 1',
      price: '100',
    }];
    httpClientSpy.get.and.returnValue(of(mockHomes));

    // Use the service to get homes
    const spy = jasmine.createSpy();
    service.getHomes$().subscribe(spy);

    // Verify that the service returned mocked data.
    expect(spy).toHaveBeenCalledWith(mockHomes);

    // Verify that the service called the proper http endpoint.
    expect(httpClientSpy.get).toHaveBeenCalledWith('http://localhost:3000/homes');
  });
});
