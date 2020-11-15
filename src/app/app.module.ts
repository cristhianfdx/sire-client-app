import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { LayoutComponent } from './modules/layout/layout.component';
import { SharedModule } from './modules/shared/shared.module';
import { InterceptorService } from './interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from '@core/core.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, LayoutComponent],
  imports: [
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    CoreModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
