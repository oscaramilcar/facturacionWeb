import { TestBed } from '@angular/core/testing';

import { FormClienteGuard } from './form-cliente.guard';

describe('FormClienteGuard', () => {
  let guard: FormClienteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FormClienteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
