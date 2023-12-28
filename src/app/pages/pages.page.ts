import { Component, OnInit } from '@angular/core';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'pages.page.html',
  styleUrls: ['pages.page.scss'],
})
export class TabsPage implements OnInit {
  tabActive: string = '';

  constructor() {}

  ngOnInit(): void {}

  onTabsWillChange(event: any) {
    this.tabActive = event.tab;
  }
}
