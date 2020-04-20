import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appNgUnityWebgl]'
})
export class NgUnityWebglDirective {

  @Input() gameName: string;
  
  constructor(private el: ElementRef) {
    
  }
  ngOnInit() {
    this.el.nativeElement.innerHTML =
      `
      <canvas id="unity-canvas" style="width: 1920px; height: 1080px; background: #231F20"></canvas>
      <script src="../assets/games/${this.gameName}/0.1.loader.js"></script>
        /*<script>
          createUnityInstance(document.querySelector("#unity-canvas"), {
          dataUrl: "../assets/games/${this.gameName}/0.1.data.gz",
          frameworkUrl: "../assets/games/${this.gameName}/0.1.framework.js.gz",
          codeUrl: "../assets/games/${this.gameName}/0.1.wasm.gz",
          streamingAssetsUrl: "StreamingAssets",
          companyName: "DefaultCompany",
          productName: "ProjectSnapWebgame",
          productVersion: "0.1",
        });
      </script>*/
      `
      ;
  }
}
