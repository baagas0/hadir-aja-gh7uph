import { Component } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';

import { Camera, CameraDirection, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  public photos: UserPhoto[] = [];

  constructor(
    private loadingCtrl: LoadingController, 
    public navCtrl: NavController
  ) {}

  async addPhotoToGallery() {

    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 50,
      width: 200,
      height: 200,
      direction: CameraDirection.Rear,
      promptLabelHeader: 'Ambil Gambar'
    });

    console.log(capturedPhoto)
    alert('tes')
  }

  async goAnOtherPage() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'custom-loading',
      message: 'Dismissing after 3 seconds...',
      duration: 3000,
    });

    loading.present();
    
    this.navCtrl.navigateForward('take-picture');
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'custom-loading',
      message: 'Dismissing after 3 seconds...',
      // duration: 3000,
    });

    loading.present();

    // loading.absen
  }
}

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}
