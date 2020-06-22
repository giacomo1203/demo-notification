import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private push: Push) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.pushSetup();
    });
  }

  pushSetup(){
    const options: PushOptions = {
       android: {
           // Añadimos el sender ID para Android.
           senderID: '983659404843'
       },
       ios: {
           alert: 'true',
           badge: true,
           sound: 'false'
       }
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => {
      alert('Received a notification: ' + JSON.stringify(notification))
    });
    pushObject.on('registration').subscribe((registration: any) => {
      alert('Device registered: ' + JSON.stringify(registration))
    });
    pushObject.on('error').subscribe(error => {
      alert('Error with Push plugin: ' + JSON.stringify(error))
    });
  }
}

