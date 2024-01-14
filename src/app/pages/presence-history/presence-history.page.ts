import { Component } from '@angular/core';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import * as moment from 'moment';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-presence-history',
  templateUrl: 'presence-history.page.html',
  styleUrls: ['presence-history.page.scss']
})
export class PresenceHistoryPage {


  historyForm!: FormGroup;
  month_year_text: string = '';

  public presence_history: any = [];
  public loaderGetHistory: boolean = false;

  constructor(
    private loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public rest: RestService,
    public modal: ModalController
  ) { }

  async ionViewDidEnter(){

    this.historyForm = new FormGroup({
      month_year: new FormControl(moment(new Date()).format('YYYY-MM-DD'),),
    });

    this.month_year_text = this.rMoment(this.historyForm?.value?.month_year, 'Y-M-D').format('MMMM y');

    await this.getPresenceHistory();

    console.log('ionViewDidEnter', this.historyForm.value)

  }

  async handleRefresh(event: any = null) {
    await this.getPresenceHistory();

    if(event !== null) event?.target.complete()
  }

  async getPresenceHistory(event: any = null) {
    console.log('getPresenceHistory', this.historyForm?.value)
    this.loaderGetHistory = true;
    this.modal?.dismiss('modal-filter');
    this.month_year_text = this.rMoment(this.historyForm?.value?.month_year, 'Y-M-D').format('MMMM y');
    console.log(this.month_year_text)

    this.rest.get('presence/history', this.historyForm?.value)
    .subscribe(async (data: any) => {
      this.loaderGetHistory = false;
      console.log('data', data);
      this.presence_history = data.data


      if(event !== null) event?.target.complete()
    });
  }

  rMoment(date: string, format : any = '') {
    const m = moment(date, [format]);
    m.locale('id');

    return m;
  }

  async goAnOtherPage(page: string) {
    this.navCtrl.navigateForward(page);
  }

}
