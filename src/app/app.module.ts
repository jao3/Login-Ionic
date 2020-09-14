import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { AuthenticationModule } from './shared/services/app/authentication/authentication.module';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './shared/services/db/security/user.service';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';

registerLocaleData(pt);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule, 
    AuthenticationModule, SharedModule],
    
  providers: [
    StatusBar,
    SplashScreen,
    { provide: LOCALE_ID, useValue:  'pt' },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
