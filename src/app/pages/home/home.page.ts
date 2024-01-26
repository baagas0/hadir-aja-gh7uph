import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Dialog } from '@capacitor/dialog';
import { HostListener } from "@angular/core";
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
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  public promos: any = [
    { "imgname": "Nasmoco YES! Service Banyak Hadiahnya!", "imglink": "https://www.nasmoco.net/nasmocoappnew/img/web%20app%20promo%20aftersales.jpg", "link": "https://nasmoco.co.id/promo" },
    { "imgname": "Beli Rame-rame Untungnya Makin Gede!", "imglink": "https://www.nasmoco.net/nasmocoappnew/img/web%20app%20promo%20mgm.jpg", "link": "https://nasmoco.co.id/promo" },
    { "imgname": "Nasmoco YES! Beli 1 Dapat 2 Mobil !", "imglink": "https://www.nasmoco.net/nasmocoappnew/img/web%20app%20promo%20yes%20sales.jpg", "link": "https://nasmoco.co.id/promo" }
  ];
  public screenHeight: number = 0;
  public screenWidth: number = 0;

  public path_asset: string = 'https://hadir-aja.web-ditya.my.id/image/selfie/';
  public photos: UserPhoto[] = [];
  public presenceStatus: string = 'loading';
  public user: any = {};
  public presence: any = {};
  public presence_history: any = [];
  public presenceIn: Boolean = false;
  public presenceOut: Boolean = false;

  public loaderGetPresence: Boolean = false;
  public loaderGetHistory: Boolean = false;

  constructor(
    private loadingCtrl: LoadingController,
    public navCtrl: NavController,
    private rest: RestService,
    public auth: AuthService,
    public router: Router,
    public storage: StorageService,
    private toastController: ToastController
  ) {
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
        this.screenHeight = window.innerHeight;
        this.screenWidth = window.innerWidth;
        console.log(this.screenHeight, this.screenWidth);
  }

  async ionViewDidEnter(){

  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  async ngOnInit () : Promise<void>{
    let checkLogin = await this.auth.check();
    if (!checkLogin) {
      this.router.navigateByUrl('/auth/login');
      // this.navCtrl.navigateRoot('/pages/dashboard');
    }

    this.user = await this.storage.get('user');
  }

  async logout () {
    const { value } = await Dialog.confirm({
      title: 'Konfirmasi',
      message: `Apakah anda yakin ingin keluar?`,
    });

    console.log('Confirmed:', value);

    if(value) {
      await this.auth.logout()
    }
  };

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
