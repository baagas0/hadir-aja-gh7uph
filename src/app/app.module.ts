// import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
// import { IonicStorageModule } from '@ionic/storage-angular';
// import { BrowserModule } from '@angular/platform-browser';
// import { RouteReuseStrategy } from '@angular/router';

// import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { RestService } from './services/rest.service';
// import { DatePipe, registerLocaleData } from '@angular/common';
// registerLocaleData(id);
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import id from '@angular/common/locales/id';
import { RestService } from './services/rest.service';
registerLocaleData(id);
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
// import { CustomComponentModule } from './components/custom-component.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
    }),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'id' },
    RestService,
    DatePipe,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
