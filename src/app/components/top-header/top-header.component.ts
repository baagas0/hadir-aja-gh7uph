import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BarService } from 'src/app/services/bar.service';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss'],
})
export class TopHeaderComponent implements OnInit {
  @Input() type: string;
  @Input() title: string;
  @Input() withBackButton: string;

  constructor(public navCtrl: NavController, private barService: BarService) {}

  async ngOnInit() {
  }
  
  async ngAfterViewInit() {
    
  }
}
