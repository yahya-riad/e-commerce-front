import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import {AuthGuard} from "../guards/auth.guard";
import {RegisterComponent} from "./register/register.component";
import {AuthComponent} from "./auth/auth.component";
import {ContactComponent} from "./contact/contact.component";


const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

