import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { AdminHomeComponent } from './component/admin/home/home.component';
import { authGuard } from './guard/auth.guard';
import { SeatingComponent } from './component/seating/seating.component';
import { EventDetailsComponent } from './component/event-details/event-details.component';
import { ProfileComponent } from './component/profile/profile.component';
import { EventComponent } from './component/admin/event/event.component';
import { CategoryComponent } from './component/admin/category/category.component';
import { OrderComponent } from './component/admin/order/order.component';
import { UsercontrolComponent } from './component/admin/usercontrol/usercontrol.component';
import { UserorderComponent } from './component/userorder/userorder.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { EventsComponent } from './component/events/events.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'seating', component: SeatingComponent, canActivate: [authGuard] },
  {
    path: 'eventDetails',
    component: EventDetailsComponent,
    canActivate: [authGuard],
  },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'order', component: UserorderComponent, canActivate: [authGuard] },
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminHomeComponent, canActivate: [authGuard] },
  {
    path: 'adminCategory',
    component: CategoryComponent,
    canActivate: [authGuard],
  },
  { path: 'adminEvent', component: EventComponent, canActivate: [authGuard] },
  { path: 'adminOrder', component: OrderComponent, canActivate: [authGuard] },
  {
    path: 'adminControl',
    component: UsercontrolComponent,
    canActivate: [authGuard],
  },
  { path: 'notFound', component: NotFoundComponent },
  { path: 'events', component: EventsComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
