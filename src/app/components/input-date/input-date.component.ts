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
import { CalendarComponentOptions } from 'ion2-calendar';
import { IonicSelectableComponent } from 'ionic-selectable';
import { RestService } from 'src/app/services/rest.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'],
})
export class InputDateComponent {
  static id: any = 0;
  public modalID: any = '';
  @Input() mode: string = 'range';
  @Input() set defaultDate(defaultDate) {

    if (defaultDate) {
      this.valDate = defaultDate;
    } else {
      this.valDate = new Date();
    }

    if (!defaultDate || !defaultDate.valueChanges) {
      return;
    }
  }
  @Input() controlName: any;
  @Input() controlNameArray: any;
  @Input() disabled: any = false;

  valueFormGroup?: FormGroup;

  valDateOptions: CalendarComponentOptions = {
    pickMode: 'range',
    from: new Date(2021, 0, 1), // days click enabled from;
    to: new Date(2024, 8, 15), // days click enabled to;
  };

  valDate: any = {
    from: new Date(),
    to: '',
  };

  constructor(
    private storage: StorageService,
    private formGroupDirective: FormGroupDirective
  ) {}

  async ngOnInit() {
    InputDateComponent.id = ++InputDateComponent.id;
    this.modalID = `modal-date-control-${InputDateComponent.id}`;

    if (this.mode) {
      this.valDateOptions.pickMode = this.mode;
    }

    if (this.mode == 'range') {
      this.valDate = {
        from: new Date(),
        to: new Date(),
      };
    } else {
      if (this.defaultDate) {
        this.valDate = this.defaultDate;
      } else {
        console.log('sini')
        this.valDate = new Date();
      }
    }

    if (this.controlName || this.controlNameArray) {
      this.valueFormGroup = this.formGroupDirective.form;
    }
  }

  async dateChange(event) {
    if (this.controlName) {
      this.valueFormGroup?.controls[this.controlName]?.setValue(this.valDate);
    }
    if (this.controlNameArray) {
      this.valueFormGroup?.controls[this.controlNameArray]?.setValue(
        this.valDate
      );
    }
  }
}
