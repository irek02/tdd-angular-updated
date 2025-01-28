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

    service.getHomes$();

    expect(httpClientSpy.get).toHaveBeenCalledWith('http://localhost:3000/homes');

  });

  it('should book home', () => {

    service.bookHome$();

    expect(httpClientSpy.post).toHaveBeenCalledWith('http://localhost:3000/bookings', {});

  });

});
