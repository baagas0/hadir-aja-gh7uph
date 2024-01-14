import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Dialog } from '@capacitor/dialog';


import { Camera, CameraDirection, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { RestService } from 'src/app/services/rest.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { Geolocation } from '@capacitor/geolocation';

import {
  Barcode,
  BarcodeFormat,
  BarcodeScanner,
  LensFacing,
} from '@capacitor-mlkit/barcode-scanning';

// import * as moment from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'app-barcode-scanning',
  templateUrl: 'barcode-scanning.page.html',
  styleUrls: ['barcode-scanning.page.scss']
})
export class BarcodeScanningPage {
  public isSupported = false;

  constructor(
    private loadingCtrl: LoadingController,
    public navCtrl: NavController,
    private rest: RestService,
    public auth: AuthService,
    public router: Router,
    public storage: StorageService,
    private toastController: ToastController,
  ) {}

  async ionViewDidEnter(){

    const l = await this.loadingCtrl.create({
      cssClass: 'custom-loading',
      message: 'Sedang memeriksa lokasi anda.',
    });
    l.present();

    Geolocation.checkPermissions().then((location) => {
      l.dismiss()
      console.error('location')
      console.error(`Location: ${location.location} | coarse: ${location.coarseLocation}`)
      // alert(`Location: ${location.location} | coarse: ${location.coarseLocation}`)
    })

  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  async ngOnInit () : Promise<void>{
    let checkLogin = await this.auth.check();
    if (!checkLogin) {
      this.router.navigateByUrl('/auth/login');
      // this.navCtrl.navigateRoot('/pages/dashboard');
    }

  }

  public async startScan(): Promise<void> {
    const formats:any = [];
    const lensFacing = LensFacing.Back;

    const { barcodes } = await BarcodeScanner.scan({
      formats: [BarcodeFormat.QrCode],
      // lensFacing: LensFacing.Back,
    });

    console.log('scan barcode')

    alert(JSON.stringify(barcodes[0].rawValue))

    console.log(barcodes[0].rawValue)
  }


  rMoment(date: string, format : any = '') {
    return moment(date, [format]);
  }

  async goAnOtherPage(page: string) {
    this.navCtrl.navigateForward(page);
  }

  async showLoading(text: any = 'Loading') {
    return new Promise<void>((resolve, reject) => {

      const loading = this.loadingCtrl.create({
        cssClass: 'custom-loading',
        message: text,
      });

      return loading;
    })

    // loading.present();

    // loading.absen
  }
}

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}
