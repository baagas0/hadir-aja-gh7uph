import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';

import { Camera, CameraDirection, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
// import { FirebaseService } from 'src/app/services/firebase.service';
import { RestService } from 'src/app/services/rest.service';
import { StorageService } from 'src/app/services/storage.service';
import {
  BarcodeScanner,
} from '@capacitor-mlkit/barcode-scanning';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage implements OnInit {
  state: String = 'login';
  loginForm!: FormGroup;

  constructor(
    private loadingCtrl: LoadingController,
    public navCtrl: NavController,

    private rest: RestService,
    public auth: AuthService,
    public storage: StorageService,
    public router: Router,
    public platform: Platform,
  ) {}

  async ngOnInit() {
    this.loginForm = new FormGroup({
      // nisn: new FormControl('11800659'),
      // password: new FormControl('123456'),
      student_number: new FormControl(''),
      password: new FormControl(''),
      // mobile: new FormControl(true),
      device_id: new FormControl(),
    });

    let checkLogin = await this.auth.check();
    if (checkLogin) {
      this.router.navigateByUrl('/pages/home');
      // this.navCtrl.navigateRoot('/pages/dashboard');
    }
  }

  async onSubmit() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      duration: 3000,
    });

    loading.present();

    this.loginForm.value.device_id = '12983h1203812391283y1982hibkjb1iugy12g21';

    this.rest.post('login', this.loginForm.value, {})
    .subscribe(async (data) => {
      console.log('data', data);
      console.log(JSON.stringify(data))

      await this.auth.setAuth(data);

      if(this.platform.is('mobile')) {
        const { available } = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
        if (available == false) await BarcodeScanner.installGoogleBarcodeScannerModule(); // INSTALL GOOGLE BARCODE JIKA BELUM
      }

      loading.dismiss();
      // this.goAnOtherPage('/pages/home');
      this.router.navigateByUrl('/pages/home');
    });
  }

  async goAnOtherPage(page: string) {

    this.navCtrl.navigateForward(page);
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
