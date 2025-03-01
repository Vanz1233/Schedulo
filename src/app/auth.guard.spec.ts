import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuard); // ✅ Inject the guard
  });

  const executeGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => TestBed.runInInjectionContext(() => guard.canActivate(route, state)); // ✅ Use the instance method

  it('should be created', () => {
    expect(guard).toBeTruthy(); // ✅ Test instance
  });
});


