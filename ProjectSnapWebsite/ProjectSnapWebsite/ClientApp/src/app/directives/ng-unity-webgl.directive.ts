import { Directive, ElementRef, Input } from '@angular/core';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NgUnityWebglManagerService } from '../services/ng-unity-webgl-manager.service';

const EngineTrigger: any = require('../assets/scripts/EngineTrigger.js');
const unityLoader: any = require('../assets/scripts/unityLoader.js');


@Directive({
  selector: '[appNgUnityWebgl]'
})
export class NgUnityWebglDirective {

  @Input() gameName: string;

  instance: any;

  constructor(private el: ElementRef, private renderer2: Renderer2, @Inject(DOCUMENT) private _document, private ngUnityWebglManagerService: NgUnityWebglManagerService) {

  }

  ngOnInit() {
    unityLoader.createUnityInstance(this.el.nativeElement, {
      dataUrl: `/assets/games/${this.gameName}/0.2.data`,
      frameworkUrl: `/assets/games/${this.gameName}/0.2.framework.js`,
      codeUrl: `/assets/games/${this.gameName}/0.2.wasm`,
      streamingAssetsUrl: "StreamingAssets",
      companyName: "DefaultCompany",
      productName: "ProjectSnapWebgame",
      productVersion: "0.2",
    }).then((instance) => {
      this.instance = instance;
      this.ngUnityWebglManagerService.setInstance(this.gameName, this.instance);
    });

    //function ToggleFullScreen() {
    //  var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
    //    (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
    //    (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
    //    (document.msFullscreenElement && document.msFullscreenElement !== null);

    //  var element = document.body.getElementsByClassName("webgl-content")[0];

    //  if (!isInFullScreen) {
    //    document.getElementById("fullScreenButton").style.backgroundImage = "url('TemplateData/img/fullScreen_off.png')";
    //    return (element.requestFullscreen ||
    //      element.webkitRequestFullscreen ||
    //      element.mozRequestFullScreen ||
    //      element.msRequestFullscreen).call(element);
    //  }
    //  else {
    //    document.getElementById("fullScreenButton").style.backgroundImage = "url('TemplateData/img/fullScreen_on.png')";
    //    if (document.exitFullscreen) {
    //      document.exitFullscreen();
    //    } else if (document.webkitExitFullscreen) {
    //      document.webkitExitFullscreen();
    //    } else if (document.mozCancelFullScreen) {
    //      document.mozCancelFullScreen();
    //    } else if (document.msExitFullscreen) {
    //      document.msExitFullscreen();
    //    }
    //  }
    //}

    //function CheckCompatibility(gameInstance, onsuccess, onerror) {
    //  if (!UnityLoader.SystemInfo.hasWebGL) {
    //    document.getElementById("errorBrowserBlock").style.display = "inherit";
    //    onerror();
    //  } else if (UnityLoader.SystemInfo.mobile) {
    //    document.getElementById("warningMobileBlock").style.display = "inherit";
    //    onsuccess();
    //  } else if (["Firefox", "Chrome", "Safari"].indexOf(UnityLoader.SystemInfo.browser) == -1) {
    //    document.getElementById("warningBrowserBlock").style.display = "inherit";
    //    onsuccess();
    //  } else {
    //    onsuccess();
    //  }
    //}

    //function RuntimeInitialized() {
    //}

    //function UnityProgress(gameInstance, progress) {
    //  if (!gameInstance.Module)
    //    return;
    //  document.getElementById("loadingBlock").style.display = "inherit";
    //  document.getElementById("fullBar").style.width = (100 * progress) + "%";
    //  document.getElementById("emptyBar").style.width = (100 * (1 - progress)) + "%";
    //  if (progress == 1) {
    //    setTimeout(function () { document.getElementById("loadingBlock").style.display = "none"; }, 3000);
    //  }
    //}

    //var gameInstance = UnityLoader.instantiate("gameContainer", "%UNITY_WEBGL_BUILD_URL%", {
    //  onProgress: UnityProgress,
    //  compatibilityCheck: CheckCompatibility,
    //  Module: {
    //    //TOTAL_MEMORY: 268435456,
    //    onRuntimeInitialized: RuntimeInitialized,
    //  },
    //});
  }
}
