import { Component } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';

// import { Camera, CameraDirection, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Category, DrawingUtils, FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

@Component({
  selector: 'app-presence-history',
  templateUrl: 'presence-history.page.html',
  styleUrls: ['presence-history.page.scss']
})
export class PresenceHistoryPage {
  // ML Model and properties (WASM & Model provided by Google, you can place your own).
  faceLandmarker!: FaceLandmarker;
  wasmUrl: string = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm";
  modelAssetPath: string = "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";
  // Native elements we need to interact to later.
  video!: HTMLVideoElement;
  canvasElement!: HTMLCanvasElement;
  canvasCtx!: CanvasRenderingContext2D;
  // A state to toggle functionality.
  showingPreview: boolean = false;
  // A challenge state for the user.
  userDidBlink: boolean = false;

  tracking: boolean = false;
  
  constructor(
    private loadingCtrl: LoadingController,
    public navCtrl: NavController
  ) { }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  async ngOnInit(): Promise<void> {
    this.faceLandmarker = await FaceLandmarker.createFromOptions(await FilesetResolver.forVisionTasks(this.wasmUrl), {
      baseOptions: { modelAssetPath: this.modelAssetPath, delegate: "GPU" },
      outputFaceBlendshapes: true, // We will draw the face mesh in canvas.
      runningMode: "VIDEO",
    }); // When FaceLandmarker is ready, you'll see in the console: Graph successfully started running.
  }
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  async ngAfterViewInit(): Promise<void> {
    this.video = document.getElementById("user-video") as HTMLVideoElement;
    this.canvasElement = document.getElementById("user-canvas") as HTMLCanvasElement;
    this.canvasCtx = this.canvasElement.getContext("2d") as CanvasRenderingContext2D;
  }



}
