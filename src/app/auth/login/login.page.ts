import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';

import { Camera, CameraDirection, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
// import { FirebaseService } from 'src/app/services/firebase.service';
import { RestService } from 'src/app/services/rest.service';
import { StorageService } from 'src/app/services/storage.service';

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
    public router: Router,
  ) {}

  async ngOnInit() {
    this.loginForm = new FormGroup({
      // nisn: new FormControl('11800659'),
      // password: new FormControl('123456'),
      nisn: new FormControl(''),
      password: new FormControl(''),
      // mobile: new FormControl(true),
      token: new FormControl(),
    });

    let checkLogin = await this.auth.check();
    if (checkLogin) {
      this.router.navigateByUrl('/pages/dashboard');
      // this.navCtrl.navigateRoot('/pages/dashboard');
    }
  }

  async onSubmit() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      duration: 3000,
    });

    loading.present();

    this.loginForm.value.token = '12983h1203812391283y1982hibkjb1iugy12g21';

    this.rest.post('login', this.loginForm.value, {}).subscribe(
      /** API Berhasil => 200 ok */
      async (data) => {
        console.log(data);

        await this.auth.setAuth(data);
        loading.dismiss();
        this.router.navigateByUrl('/pages/dashboard');
        // this.navCtrl.navigateRoot('/pages/dashboard');
      },

      /** API Gagal => 500 */
      async (e) => {
        loading.dismiss();
        console.log('e');
        console.log(e);
        e.subscribe((err: any) => {
          console.log(err)
        })
        // alert(e);
      }
    );
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
