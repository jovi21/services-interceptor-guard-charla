import { ProductService } from './product.service';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

describe('Product Service', () => {
  let service: ProductService;
  let httpController: HttpTestingController;
  let apiURL = environment.apiURL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });

    service = TestBed.inject(ProductService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('GetProducts', () => {
    const mockData = {
      id: 0,
      name: '',
      details: [],
    };

    service.getProducts().subscribe((product) => {
      expect(product).toStrictEqual(mockData);
    });

    let url = apiURL + '/product';
    let req = httpController.expectOne(url);
    expect(req.request.method).toBe('GET');

    req.flush(mockData);
  });
});
