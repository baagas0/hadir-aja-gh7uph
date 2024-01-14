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

@Component({
  selector: 'app-presence-barcode',
  templateUrl: 'presence-barcode.page.html',
  styleUrls: ['presence-barcode.page.scss']
})
export class PresenceBarcodePage {
  public loaderGetHistory: Boolean = false;
  public presence_history: any = [];

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
    this.getPresenceHistory();
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  async ngOnInit () : Promise<void>{
    let checkLogin = await this.auth.check();
    if (!checkLogin) {
      this.router.navigateByUrl('/auth/login');
      // this.navCtrl.navigateRoot('/pages/dashboard');
    }

  }

  async getPresenceHistory(event: any = null) {
    this.loaderGetHistory = true;

    console.log('getPresenceHistory')
    this.rest.get('presence-barcode', {})
    .subscribe(async (data: any) => {
      this.loaderGetHistory = false;
      console.log('data', data);
      this.presence_history = data.data

      if(event !== null) event?.target.complete()
    });
  }

  goToDetail(data: any) {
    localStorage.setItem('pages/presence-barcode/detail', JSON.stringify(data));
    this.goAnOtherPage('pages/presence-barcode/detail');
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
