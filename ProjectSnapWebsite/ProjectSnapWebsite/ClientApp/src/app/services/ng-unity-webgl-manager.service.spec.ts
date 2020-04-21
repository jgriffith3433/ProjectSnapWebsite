import { TestBed } from '@angular/core/testing';

import { NgUnityWebglManagerService } from './ng-unity-webgl-manager.service';

describe('NgUnityWebglManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgUnityWebglManagerService = TestBed.get(NgUnityWebglManagerService);
    expect(service).toBeTruthy();
  });
});
