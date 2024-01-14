import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormControlName,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Subscription } from 'rxjs';
import { RestService } from 'src/app/services/rest.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
})
export class InputSelectComponent {
  @Input() uri: any;
  @Input() outline: any = true;
  @Input() controlName: any;
  @Input() controlNameArray: any;
  @Input() placeholder: any = 'Pilih Data';
  @Input() set defaultCaption(defaultCaption) {
    
    if(defaultCaption != '' && defaultCaption != null) {

      this.dataSelected = {
        name: defaultCaption,
      };
    }
    
    if (!defaultCaption || !defaultCaption.valueChanges) {
      return;
    }
  }
  @Input() set defaultItem(defaultItem) {
    this.datas = defaultItem;

    if (!defaultItem || !defaultItem.valueChanges) {
      return;
    }
  }

  valueFormGroup?: FormGroup;

  subFormValue: Subscription;

  dataLimit: number = 20;
  dataSelected: any;

  datas: any = []; // Data Lookup

  currentPage: any = 1;
  countData: any = 0;

  constructor(
    private storage: StorageService,
    private restService: RestService,
    private formGroupDirective: FormGroupDirective
  ) {}

  async ngOnInit() {
    if (this.controlName || this.controlNameArray) {
      this.valueFormGroup = this.formGroupDirective.form;
    }

    if (this.uri == 'production-units') {
      this.dataSelected = await this.storage.get('production_unit_id_array');
      if (this.controlName && this.dataSelected?.id) {
        this.valueFormGroup.controls[this.controlName].setValue(
          this.dataSelected.id
        );

        if (this.controlNameArray) {
          this.valueFormGroup.controls[this.controlNameArray].setValue(
            this.dataSelected
          );
        }
      }
    }

    if (this.defaultItem) {
      this.datas = this.defaultItem;
    } else {
      this.getData();
    }
  }

  async getData() {
    if (!this.uri || this.uri == '') {
      return;
    }

    await this.restService
      .getting(`lookup/${this.uri}`, {
        order: 'created_at',
        limit: this.dataLimit,
        offset: this.currentPage,
      })
      .then(async (res) => {
        this.datas = res.data.data;
        this.countData = res.data.record;

        // console.log('select');
        // console.log(this.valueFormGroup.controls[this.controlName].value);
      });
  }

  async dataChange(event) {
    if (this.uri == 'production-units') {
      await this.storage.set('production_unit_id', event.value.id);
      await this.storage.set('production_unit_id_array', event.value);
    }

    if (this.controlName) {
      this.valueFormGroup.controls[this.controlName].setValue(event.value.id);
    }
    if (this.controlNameArray) {
      console.log(`this.controlNameArray: ${this.controlNameArray}`);
      this.valueFormGroup.controls[this.controlNameArray].setValue(event.value);
      console.log(this.valueFormGroup.value);
    }
  }

  async getMoreData(event: {
    component: IonicSelectableComponent;
    text: string;
  }) {
    if (!this.uri || this.uri == '') {
      return;
    }

    if (this.currentPage * this.dataLimit >= this.countData) {
      event.component.disableInfiniteScroll();
      return;
    }

    this.currentPage++;

    let uri = `lookup/${this.uri}`;

    await this.restService
      .getting(uri, {
        order: 'created_at',
        limit: this.dataLimit,
        offset: this.currentPage,
      })
      .then((res) => {
        let data = event.component.items.concat(res.data.data);

        event.component.items = data;

        event.component.endInfiniteScroll();
      });
  }
}
