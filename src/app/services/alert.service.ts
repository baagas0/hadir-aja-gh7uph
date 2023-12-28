import { Injectable } from '@angular/core';
import {
  BackgroundColorOptions,
  StatusBar,
  Style,
} from '@capacitor/status-bar';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  public async show(title: any, message: any) {
    const alert = await this.alertController.create({
      subHeader: title,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  public async showToast(message: any, position: 'top' | 'middle' | 'bottom' = 'bottom') {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position
    });

    await toast.present();
  }
}
