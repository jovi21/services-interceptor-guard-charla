import { TestBed } from '@angular/core/testing';

import { TokenInterceptor } from './token.interceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { LoginService } from '../services/login.service';

describe('TokenInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let mockLoginService = {
    isLoggedIn: true,
  };

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TokenInterceptor,
        { provide: LoginService, useValue: mockLoginService },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        },
      ],
    })
  );

  beforeEach(() => {
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    const interceptor: TokenInterceptor = TestBed.inject(TokenInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('Add Headers', () => {
    const URL = 'http://localhost:8000/product';
    const HEADERS = 'AUTHOR_ID';

    httpClient.get(URL).subscribe();

    let req = httpTestingController.expectOne(URL);
    let request = req.request.headers;

    expect(request.has(HEADERS)).toBeTruthy();
    expect(request.get(HEADERS)).toBe('0');

    httpTestingController.verify();
  });
});
