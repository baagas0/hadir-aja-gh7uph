import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Dialog } from '@capacitor/dialog';

import { Camera, CameraDirection, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { RestService } from 'src/app/services/rest.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { Geolocation } from '@capacitor/geolocation';
import { HostListener } from '@angular/core';
import { Platform } from '@ionic/angular';


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
  public location: any = {
    permissions: {
      location: 'prompt',
      coarseLocation: 'prompt'
    },
    loading: false,
    message: '',
    formatted_address: '',
    lat: 0,
    lng: 0
  }
  public backButtonSubscription: any = null

  constructor(
    private loadingCtrl: LoadingController,
    public navCtrl: NavController,
    private rest: RestService,
    public auth: AuthService,
    public router: Router,
    public storage: StorageService,
    private toastController: ToastController,
    public platform: Platform,
  ) {}

  // @HostListener('document:ionBackButton', ['$event'])
  // private async overrideHardwareBackAction($event:any) {
  //   console.log('overrideHardwareBackAction:', $event);
  //   $event.detail.register(100, async () => {
  //     $event.stopImmediatePropagation();
  //     $event.stopPropagation();
  //     $event.preventDefault();
  //   });
  //   await void(0); // Do nothing
  // }

  async ionViewDidEnter(){
    this.backButtonSubscription = this.platform.backButton
        .subscribeWithPriority(9999, ($event) => {
              // Do my stuff on back button tap
              console.log('$event', $event)
        });

    this.getPresence();
    this.getPresenceHistory();

    await this.handleLocation()

  }

  ionViewWillLeave() {
    this.backButtonSubscription.unsubscribe();
  }

  async handleLocation() {
    // const l = await this.loadingCtrl.create({
    //   cssClass: 'custom-loading',
    //   message: 'Sedang memeriksa lokasi anda.',
    // });
    // l.present();
    this.location.loading = true
    this.location.message = ''

    try {
      let permissions = await Geolocation.checkPermissions()
      if (!permissions || permissions.coarseLocation !== 'granted') {
        console.log('geolocation: request permission')
        permissions = await Geolocation.requestPermissions({permissions:['coarseLocation']})
        if(permissions.coarseLocation != 'granted') {
          this.location.loading = false
          throw 'Aplikasi tidak memiliki akses lokasi.'
        }
      }

      let location = await Geolocation.getCurrentPosition({ enableHighAccuracy: true })
      this.location.lat = location.coords.latitude
      this.location.lng = location.coords.longitude

      await this.rest.get('https://maps.googleapis.com/maps/api/geocode/json', {
        latlng: `${this.location.lat},${this.location.lng}`,
        key: `AIzaSyArJkzKNSGOGAwtMcsCl6cRlFfAG_dIqmE`
      }, {}).subscribe(async (data: any) => {
        // console.log(data)
        if (data && data.results && data.results.length) {
          let address = data.results[0]
          let fa = address.formatted_address
          if (fa.split(',').length) this.location.formatted_address = fa.split(',')[0]
        }

        this.location.loading = false
      });
    } catch (error) {
      console.log('handleLocation', error)
      this.location.loading = false
      this.location.message = error
      this.location.formatted_address = ''
      this.location.lat = 0
      this.location.lng = 0
      alert(error)
      // l.dismiss()
    }
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  async ngOnInit () : Promise<void>{
    let checkLogin = await this.auth.check();
    if (!checkLogin) {
      this.router.navigateByUrl('/auth/login');
      // this.navCtrl.navigateRoot('/pages/dashboard');
    }

    this.user = await this.storage.get('user');
    if(this.user?.selfie_img === null) this.presenceStatus = 'not-ready'
    console.log(this.user)
  }

  async handleRefresh(event: any = null) {
    await this.getPresence();
    await this.getPresenceHistory();
    await this.handleLocation();

    if(event !== null) event?.target.complete()
  }

  // User
  async takeSelfie() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
      width: 200,
      height: 200,
      direction: CameraDirection.Rear,
      promptLabelHeader: 'Ambil Gambar'
    });

    const data = {
      selfie_image_base64: capturedPhoto.base64String
    }

    const loading1 = await this.loadingCtrl.create({
      cssClass: 'custom-loading',
      showBackdrop: true,
      message: 'Memproses wajah anda...',
    });
    loading1.present();
    this.rest.post(`profile/selfie-image`, data, {})
    .subscribe(async (data: any) => {
      loading1.dismiss();

      // SHOW TOAST SUCCESS
      const toast = await this.toastController.create({
        header: 'Presensi',
        message: data.message,
        duration: 2000,
        position: 'top',
        cssClass: 'custom-toast',
        color: 'success',
      });

      this.handleRefresh();

      console.log(data.data)
      await this.storage.set('user', data.data);
      this.user = data.data
      toast.present();

    });
  }

  // Presensi kelas
  async handlePresenceKelasButton() {
    if (this.user?.school_group?.group_code === 'GR') {
      this.goAnOtherPage('pages/presence-barcode')
    } else {
      this.doPresenceKelas();
    }
  }

  public async doPresenceKelas(): Promise<void> {

    if(
      !this.location.lat ||
      !this.location.lng
    ) {
      alert('Lokasi tidak ditemukan')
      return
    }

    const loading1 = await this.loadingCtrl.create({
      cssClass: 'custom-loading',
      showBackdrop: true,
      message: 'Memproses presensi anda...',
    });
    loading1.present();

    // return position;
    const lat = this.location.lat
    const lng = this.location.lng

    const { barcodes } = await BarcodeScanner.scan({
      formats: [BarcodeFormat.QrCode],
    });

    this.rest.post(`presence-barcode/do-presence`, { qr_code: barcodes[0].rawValue, lat, lng }, {})
    .subscribe(async (data: any) => {
      console.log(data)
      loading1.dismiss();

      this.getPresenceHistory();

      // SHOW TOAST SUCCESS
      const toast = await this.toastController.create({
        header: 'Presensi',
        message: data.message,
        duration: 2000,
        position: 'top',
        cssClass: 'custom-toast',
        color: 'success',
      });
      toast.present();

    });

  }

  // Presensi Harian
  async getPresence(event: any = null) {
    this.loaderGetPresence = true;

    this.rest.get('daily-presence/find', {})
    .subscribe(async (data: any) => {
      this.loaderGetPresence = false;

      console.log('data', data);
      this.presence = data.data
      if(data?.data?.id === null) this.presenceStatus = 'not-ready'
      else this.presenceStatus = 'ready'

      const m = moment(this.presence.hour_in, ['h:m'])
      console.log(m)
      this.presence.hour_in_text = m.format('h:m') + ' WIB'

      if(this.presence?.id && this.presenceStatus == 'ready') {

        // SET PRESENCE IN STATE
        if (this.presence?.state === 'tidak diketahui') {
          this.presenceIn = true;
        }

        if (this.presence?.state === 'masuk') {
          this.presenceOut = true;
        }

      }

      if(event !== null) event?.target.complete()
    });
  }

  async getPresenceHistory(event: any = null) {
    this.loaderGetHistory = true;

    console.log('getPresenceHistory')
    this.rest.get('presence/history', {})
    .subscribe(async (data: any) => {
      this.loaderGetHistory = false;
      console.log('data', data);
      this.presence_history = data.data

      if(event !== null) event?.target.complete()
    });
  }

  async takePresence(type: 'in' | 'out') {
    console.log('takePresence')

    if(
      !this.location.lat ||
      !this.location.lng
    ) {
      alert('Lokasi tidak ditemukan')
      return
    }

    const loading = await this.loadingCtrl.create({
      cssClass: 'custom-loading',
      showBackdrop: true,
      message: 'Mengambil lokasi terbaru...',
    });
    loading.present();

    // return position;
    const lat = this.location.lat
    const lng = this.location.lng
    loading.dismiss();

    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
      width: 200,
      height: 200,
      direction: CameraDirection.Rear,
      promptLabelHeader: 'Ambil Gambar'
    });

    const data = {
      presence_daily_id: this.presence.id,
      base64_selfie_img: capturedPhoto.base64String,
      lat: lat,
      lng: lng,
    };


    const loading1 = await this.loadingCtrl.create({
      cssClass: 'custom-loading',
      showBackdrop: true,
      message: 'Memproses presensi anda...',
    });
    loading1.present();
    console.log(JSON.stringify(data))
    this.rest.post(`daily-presence/${type}`, data, {})
    .subscribe(async (data: any) => {
      loading1.dismiss();

      // SHOW TOAST SUCCESS
      const toast = await this.toastController.create({
        header: 'Presensi',
        message: data.message,
        duration: 2000,
        position: 'top',
        cssClass: 'custom-toast',
        color: 'success',
      });
      toast.present();

      this.getPresence()
      this.getPresenceHistory();

      if(type === 'in') this.presenceIn = false;
      if(type === 'out') this.presenceOut = false;
    });

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
