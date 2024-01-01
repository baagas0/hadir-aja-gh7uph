import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';

import { Camera, CameraDirection, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { RestService } from 'src/app/services/rest.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { Geolocation } from '@capacitor/geolocation';

// import * as moment from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  public path_asset: string = 'https://af3b-93-174-93-20.ngrok-free.app/image/selfie/';
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
  ) {}

  async ionViewDidEnter(){
    this.getPresence();
    this.getPresenceHistory();

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

    this.user = await this.storage.get('user');
    if(this.user?.selfie_img === null) this.presenceStatus = 'not-ready'
    console.log(this.user)
  }

  async handleRefresh(event: any = null) {
    await this.getPresence();
    await this.getPresenceHistory();

    if(event !== null) event?.target.complete()
  }

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
    const loading = await this.loadingCtrl.create({
      cssClass: 'custom-loading',
      showBackdrop: true,
      message: 'Mengambil lokasi terbaru...',
    });
    loading.present();

    Geolocation.getCurrentPosition()
    .then(async (position) => {
      // return position;
      const lat = position.coords.latitude
      const lng = position.coords.longitude
      loading.dismiss();
  
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
        quality: 20,
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

        if(type === 'in') this.presenceIn = false;
        if(type === 'out') this.presenceOut = false;
      });
    })
    .catch((err) => {
      loading.dismiss();
      alert(err.message);
      console.error('coordinates err', err)
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
