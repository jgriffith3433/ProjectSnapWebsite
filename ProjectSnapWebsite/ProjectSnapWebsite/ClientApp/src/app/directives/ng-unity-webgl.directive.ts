import { Directive, ElementRef, Input } from '@angular/core';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
const unityLoader: any = require('../assets/scripts/unityLoader.js');


@Directive({
  selector: '[appNgUnityWebgl]'
})
export class NgUnityWebglDirective {

  @Input() gameName: string;
  
  constructor(private el: ElementRef, private renderer2: Renderer2, @Inject(DOCUMENT) private _document) {
    
  }

  ngOnInit() {
    unityLoader.createUnityInstance(this.el.nativeElement, {
      dataUrl: `/assets/games/${this.gameName}/0.1.data`,
      frameworkUrl: `/assets/games/${this.gameName}/0.1.framework.js`,
      codeUrl: `/assets/games/${this.gameName}/0.1.wasm`,
      streamingAssetsUrl: "StreamingAssets",
      companyName: "DefaultCompany",
      productName: "ProjectSnapWebgame",
      productVersion: "0.1",
    });
  }
}
