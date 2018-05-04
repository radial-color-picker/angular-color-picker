import { TestBed, inject } from '@angular/core/testing';

import { AngularColorPickerService } from './angular-color-picker.service';

describe('AngularColorPickerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AngularColorPickerService]
    });
  });

  it('should be created', inject([AngularColorPickerService], (service: AngularColorPickerService) => {
    expect(service).toBeTruthy();
  }));
});
