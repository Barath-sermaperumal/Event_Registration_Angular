import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';
import { AdminHomeComponent } from './component/admin/home/home.component';
import { LoaderInterceptorService } from './service/interceptor/loaderInterceptor.service';
import { AuthInterceptorService } from './service/interceptor/authInterceptor.service';
import { SeatingComponent } from './component/seating/seating.component';
import { EventDetailsComponent } from './component/event-details/event-details.component';
import { ProfileComponent } from './component/profile/profile.component';
import { UsercontrolComponent } from './component/admin/usercontrol/usercontrol.component';
import { EventComponent } from './component/admin/event/event.component';
import { CategoryComponent } from './component/admin/category/category.component';
import { OrderComponent } from './component/admin/order/order.component';
import { UserorderComponent } from './component/userorder/userorder.component';
import { DataService } from './service/data.service';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminHomeComponent,
    SeatingComponent,
    EventDetailsComponent,
    ProfileComponent,
    UsercontrolComponent,
    EventComponent,
    CategoryComponent,
    OrderComponent,
    UserorderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    DataService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
