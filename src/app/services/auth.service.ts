import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { RestService } from './rest.service';
import { StorageService } from './storage.service';
// import { RestService } from './rest.service';
// import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    // public restService: RestService
    public storage: StorageService,
    public navCtrl: NavController
  ) {
    
  }

  async check() {
    const token = localStorage.getItem('token');
    // const token = await this.storage.get('token');
    console.log(token);
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  async setAuth(data: any) {
    /** Save ke storage */
    // let unpaid_bill = data.user.unpaid_bill;
    // let map = data.user.map;
    let user = data.user;

    console.log('data');

    await this.storage.set('token', data.authorization.token);
    localStorage.setItem('token', data.authorization.token)
    await this.storage.set('user', user);
  }

  async logout() {
    await this.storage.remove('token');
    await this.storage.remove('user');
    await this.storage.remove('unpaid_bill');
    await this.storage.remove('map');

    this.navCtrl.navigateRoot('/auth/login');
  }
}
