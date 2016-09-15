import 'rxjs/Rx'; // load all features of reactive extensions

import { Component, ViewChild } from '@angular/core';
import { Platform, ionicBootstrap, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { TabsPage } from './pages/tabs/tabs';

import { OrderFormListComponent } from './orderForm/component/orderForm-list.component';
import { LoginComponent } from './shared/component/login.component';
import { MenuComponent } from './shared/component/menu.component';

import {Auth, User, CloudSettings, provideCloud} from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '27de0193'
  }
};

@Component({
  templateUrl: './build/app.html',
  directives: [MenuComponent]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginComponent;
  
  constructor(public platform: Platform, private _auth: Auth, private _user: User) {
    this.initializeApp();    

    // set rootPage
    if (this._auth.isAuthenticated()) {
      this.rootPage = OrderFormListComponent;
    } else {
      this.rootPage = LoginComponent;
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  } 
}

ionicBootstrap(MyApp, [provideCloud(cloudSettings)]);