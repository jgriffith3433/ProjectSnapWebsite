import { Directive, ElementRef, Input, HostListener } from '@angular/core';
import { NgUnityWebglManagerService } from '../services/ng-unity-webgl-manager.service';

@Directive({
  selector: '[appNgUnityWebglFocusElement]'
})
export class NgUnityWebglFocusElementDirective {

  @Input() gameName: string;

  constructor(private el: ElementRef, private ngUnityWebglManagerService: NgUnityWebglManagerService) {

  }
  @HostListener('focus')
  onFocus() {
    var instance = this.ngUnityWebglManagerService.getInstance(this.gameName);
    if (instance) {
      var event = {
        eventName: "UIInputSwitched",
        payload: JSON.stringify({
          isUnity: false
        })
      };

      var message = JSON.stringify(event);
      instance.SendMessage('UIEventDispatcher', 'ProcessEvent', message);
    }
  }

  @HostListener('focusout')
  onFocusout() {
    var instance = this.ngUnityWebglManagerService.getInstance(this.gameName);
    if (instance) {
      var event = {
        eventName: "UIInputSwitched",
        payload: JSON.stringify({
          isUnity: true
        })
      };

      var message = JSON.stringify(event);
      instance.SendMessage('UIEventDispatcher', 'ProcessEvent', message);
    }
  }
}
