import { NgUnityWebglDirective } from './ng-unity-webgl.directive';

describe('NgUnityWebglDirective', () => {
  it('should create an instance', () => {
    var elDiv = document.createElement('div');
    elDiv.setAttribute('path', 'assets/projectsnapwebgame');
    let el = {
      nativeElement: elDiv
    };
    const directive = new NgUnityWebglDirective(el);
    expect(directive).toBeTruthy();
  });
});
