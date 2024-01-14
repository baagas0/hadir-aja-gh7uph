import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Dialog } from '@capacitor/dialog';

import { Camera, CameraDirection, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { RestService } from 'src/app/services/rest.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { Geolocation } from '@capacitor/geolocation';

// import * as moment from 'moment';
import * as moment from 'moment';
import { interval } from 'rxjs';

@Component({
  selector: 'app-presence-barcode-detail',
  templateUrl: 'presence-barcode-detail.page.html',
  styleUrls: ['presence-barcode-detail.page.scss']
})
export class PresenceBarcodeDetailPage {
  public path_asset: string = 'https://hadir-aja.web-ditya.my.id/image/selfie/';
  public loaderGetHistory: Boolean = false;
  public presence_history: any = [];
  public presence_barcode: any = {}
  public interval_s: any;

  constructor(
    private loadingCtrl: LoadingController,
    public navCtrl: NavController,
    private rest: RestService,
    public auth: AuthService,
    public router: Router,
    public storage: StorageService,
    private toastController: ToastController
  ) {}

  async ionViewDidEnter(){
    const data_string: any = localStorage.getItem('pages/presence-barcode/detail');
    const data = JSON.parse(data_string);
    this.presence_barcode = data;

    const i = interval(10000)
    this.interval_s = i.subscribe((val) => {
      console.log(val);
      this.reloadQrCode()
    });
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  async ngOnInit () : Promise<void>{
    let checkLogin = await this.auth.check();
    if (!checkLogin) {
      this.router.navigateByUrl('/auth/login');
      // this.navCtrl.navigateRoot('/pages/dashboard');
    }
  }

  ngOnDestroy () {
    console.log('ngOnDestroy');
    this.interval_s.unsubscribe();
  }

  async reloadQrCode(event: any = null) {
    if(!this.presence_barcode?.id) return

    this.loaderGetHistory = true;

    console.log('reloadQrCode')
    this.rest.post(`presence-barcode/re-generate-qr-code/${this.presence_barcode.id}`, {}, {})
    .subscribe(async (data: any) => {
      this.presence_barcode = data.data
    });
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
