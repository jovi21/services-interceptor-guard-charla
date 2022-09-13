import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { LoginService } from '../services/login.service';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

function fakeRouterState(url: string): RouterStateSnapshot {
  return {
    url,
  } as RouterStateSnapshot;
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;

  let mockLoginService = {
    isLoggedIn: true,
    login: jest.fn(),
  };
  let dummyRoute = {} as ActivatedRouteSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: LoginService,
          useValue: mockLoginService,
        },
      ],
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('User Authenticated', () => {
    beforeEach(() => {
      mockLoginService.isLoggedIn = true;
    });

    it('Method canActivate returns true', () => {
      let mockUrl = '/admin/dashboard';
      let canActivate = guard.canActivate(dummyRoute, fakeRouterState(mockUrl));
      expect(canActivate).toBeTruthy();
    });
  });

  describe('User Not Authenticated', () => {
    beforeEach(() => {
      mockLoginService.isLoggedIn = false;
    });

    it('calling the navigate method and canActivate returns false', () => {
      let mockUrl = '/admin/dashboard';
      let routerNavigate = jest
        .spyOn(router, 'navigate')
        .mockImplementation(() => Promise.resolve(true));
      let canActivate = guard.canActivate(dummyRoute, fakeRouterState(mockUrl));

      expect(canActivate).toBeFalsy();

      expect(routerNavigate).toBeCalled();
    });
  });
});
