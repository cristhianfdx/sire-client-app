import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { QuicklinkModule } from 'ngx-quicklink';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { LayoutComponent } from './modules/layout/layout.component';
import { SharedModule } from './modules/shared/shared.module';
import { InterceptorService } from './interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from '@core/core.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [AppComponent, LayoutComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    SimpleNotificationsModule.forRoot(),
    AngularFireStorageModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    QuicklinkModule,
    BrowserModule,
    SharedModule,
    FormsModule,
    CoreModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'),
      },
    }),
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
